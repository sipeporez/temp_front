import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // useParams는 필요 없음
import { snoSel } from '../SnoAtom';
import { useRecoilValue } from 'recoil';

const url = process.env.REACT_APP_API_URL;

const BoardEdit = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    const params = new URLSearchParams(useLocation().search);
    const idxno = parseInt(params.get('idx'), 10); // 진수 10으로 변환
    const sno = useRecoilValue(snoSel);

    const { title, content } = board; // 초기화한데 게시물(board)을 title, content의 value에 저장한다.

    // 글쓰기 폼의 입력값이 변경될 때 실행
    const onChange = (e) => {
        const { name, value } = e.target;
        setBoard({
            ...board, // 해당 바디에서 정의한 속성(name)의 값(value)만 업데이트하고 board에 있는 기존의 속성은 유지해서 board를 수정
            [name]: value,
        });
    };

    const config = {
        headers: {
            'Content-Type': 'application/json', // 요청 본문의 board 데이터를 json 타입으로 지정
            'Authorization': sessionStorage.getItem("token")
        }
    };

    const checkUser = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idxno}`, '', config);
            if (resp.status === 200) {
                getBoard();
                return 1;
            }
        }
        catch (error) {
            if (error.response.status === 401) {
                alert('게시글 작성자가 아니므로 해당 게시글을 수정할 수 없습니다.');
                navigate("/")
                return 0;
            }
        }
    }

    // 주소 직접 입력하여 접근할 때 방지하는 메서드
    const checkToken = () => {
        if (sessionStorage.getItem("token") == null) {
            alert("잘못된 접근입니다.")
            navigate('/')
            return;
        }
        else if (checkUser() === 0) {
            alert("해당 게시글을 수정할 권한이 없습니다.")
        }
    }

    const getBoard = async () => { // 비동기 함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = await axios.get(`${url}board/view?idx=${idxno}`);
            setBoard(resp.data); // resp에 가져온 데이터를 board 상태변수에 저장
        } catch (error) {
            alert("게시판 자료를 가져오는데 실패했습니다.");
            return;
        }
    };

    // 게시글 수정
    const editBoard = async () => {

        // 백엔드   에서 글쓰기 요청시 토큰값이 있어야 수정 허용하도록 설정
        try {
            const resp = await axios.post(`${url}edit?sno=${sno}&idx=${idxno}`, JSON.stringify(board), config);
            if (resp.status === 200) {
                // (===): value, type 모두 동일한지
                // (==): value만 동일한지 
                alert('게시물이 수정되었습니다.');
                navigate(-1); // 수정: '=' 추가
            }
        } catch (error) {
            if (error.response.status === 401) { // 수정: error.response로 변경
                alert('게시글 작성자가 아니므로 해당 게시물을 수정할 수 없습니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
            return;
        }
    };

    // 취소 버튼 클릭 시
    const backToDetail = () => {
        navigate(-1);
    };

    // 컴포넌트 마운트 시 게시글 가져오기
    useEffect(() => {
        checkToken();
    },[]); // 의존성 배열에 필요한 변수를 추가

    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-5xl font-bold text-green-700 my-10">게시물 수정</h2>
            </div>
            <div>
                <span>제목</span>
                <input type="text" name="title" value={title} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea
                    name="content"
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={onChange}
                ></textarea>
            </div>
            <br />
            <div>
                <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={editBoard}>수정</button>
                <button className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={backToDetail}>취소</button>
            </div>
        </div>
    );
};

export default BoardEdit;
