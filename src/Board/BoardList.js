import axios from "axios"; // HTTP 요청을 간편하게 해주는 라이브러리
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const BoardList = ({ sno }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [refresh, setRefresh] = useState(0);


    const selectRef = useRef();
    const inputRef = useRef();

    // 게시판 글쓰기 페이지로 이동
    const moveToWrite = () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("글쓰기는 로그인 후 사용하실 수 있습니다.")
            return;
        }
        navigate('/write');
    }

    const [boardList, setBoardList] = useState([]); // 빈 리스트 생성
    const getBoardList = async () => {

        const resp = await (await axios.get(url + "board?sno=" + sno)).data
        //axios.get: 
        // 해당 역번호(sno)의 게시판 데이터를 응답 변수에 할당
        setBoardList(resp.content)
    }

    useEffect(() => {
        console.log("호출됨"+sno)
        getBoardList(); // 게시글 목록 조회 함수 호출
    }, [sno]);

    useEffect(() => {
        if (location.state?.refresh) {
            // ?. 연산자: 
            // 속성이 존재하지않으면 undefined 반환하고 그 뒤의 코드 실행 중단, 
            // 속성이 존재하면 다음 코드를 실행
            // 현재 위치에서 
            setRefresh(prev => prev + 1); //현재 상태값을 새로운 상태값으로 반환
        }
    }, [location]); // 컴포넌트가 처음 마운트 되거나, location 객체가 변경될때마다 해당 훅이 실행 

    useEffect(() => {
        selectRef.current.value = "title"; //초기값 설정
        inputRef.current.value = ""; // 초기값 설정
        // 컴포넌트 초기화 로직
        getBoardList();
    }, [refresh]); //setRefresh를 통해 refresh가 변경되었으므로 해당 훅을 실행한다.

    // 검색버튼 누를시 호출
    const searchBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        let keyword = inputRef.current.value.trim(); // 현재 입력된 값을 keyword 변수에 저장하고 trim 함수로 양옆 공백을 자름

        if (keyword.length < 2) {
            alert("2글자 이상 입력해주세요.")
            inputRef.current.focus()
            return
        }
        try {
            const resp = (await axios.get(`${url}board/search?searchType=${selectRef.current.value}&keyword=${keyword}`));
            setBoardList(resp.data.content) // resp에 가져온 데이터를 board 상태변수에 저장

        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("게시판 자료를 가져오는데 실패했습니다.")
        }
        finally {
            if (boardList.length === 0) {
                return "검색된 내용이 없습니다"
            }
        }
    }

    return (
        <div className='flex flex-col w-3/6'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-5xl font-bold text-green-700 my-10">게시판</h2>
            </div>
            <div>
                <label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={selectRef}>
                        {/* 셀렉트 박스의 값이 변경될때  handleSearchTypeChange 함수 호출*/}
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="nickname">닉네임</option>
                    </select>
                </label>
                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    type="text" ref={inputRef}></input>
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={searchBoard}>검색</button>
            </div>
            <div>
                {boardList.length === 0 ? (
                    <p>검색된 내용이 없습니다.</p>
                ) : (
                    <ul>
                        {boardList && boardList.map((board) => (
                            <li className="flex space-x-3" key={board.idx}>
                                <li className="text-green-400">{board.idx}</li>
                                <Link className="text-blue-500 hover:text-blue-700 visited:text-purple-600"
                                    to={`/board/view?sno=${board.station_no}&idx=${board.idx}`}>
                                    {board.title}
                                </Link>
                                <li>{board.nickname}</li>
                                <li>{board.create_Date.replace('T', '/').slice(0, 16)}</li>
                            </li>
                        ))}
                    </ul>
                )}
                <div>
                    <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={moveToWrite}>글쓰기</button>
                </div>
            </div>

        </div>
    );
};

export default BoardList;