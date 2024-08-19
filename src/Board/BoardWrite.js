import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { snoSel } from '../SnoAtom';
import { useRecoilValue } from 'recoil';

const url = process.env.REACT_APP_API_URL;

// 게시판 글쓰기
const BoardWrite = () => {

    const sno = useRecoilValue(snoSel);

    const navigate = useNavigate();

    // board의 state를 빈 값으로 초기화
    const [board, setBoard] = useState(
        {
            title: '',
            content:'',
        }
    );

    const { title, content } = board; // board의 props의 비어있는 값으로 초기화
    
    // 글쓰기 폼의 입력값이 변경될때 실행
    const onChange = (e) => {
        const { name, value } = e.target;
        setBoard(
            {
                ...board, // 해당 바디에서 정의한 속성(name)의 값(value)만 업데이트하고 board에 있는 기존의 속성은 유지해서 board를 수정
                [name]: value,
                // name의 value만 입력하도록 하는 함수
            }
        );
    };


    // 글쓰기 저장 함수
    const saveBoard = async () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('제목과 내용은 빈 칸일 수 없습니다.');
            return;
        }

        const config = { 
            headers: { 
              'Content-Type': 'application/json', // 요청 본문의 board 데이터를 json타입으로 지정
              'Authorization': sessionStorage.getItem("token")
            }
        } // 백엔드에서 글쓰기 요청시 토큰값이 있어야 글쓰기 허용하도록 설정
        // 

        // axios.post(요청을 보낼 서버 주소, 서버로 전송할 데이터)
        try {
            await axios.post(`${url}write?sno=${sno}`, JSON.stringify(board), config);
            // 글쓰기를 하려면 역번호, JSON 변환된 board 객체, token 값이 넘어가도록 axios.post 지정

            // 서버에 요청 성공하면 alert을 띄우고 페이지 이동
            alert('등록되었습니다.');
            navigate(-1);
        } catch (error) {
            console.error('Error:', error);
            alert('등록에 실패하였습니다.');
        }
        // 서버에 board 객체를 전송(요청)하고, 화면에 응답으로 alert 출력 후, navigate 함수를 통해서 board 페이지로 이동
        // 정리: 서버에 요청(req) 성공시 then체인으로 응답(res)
    };

    // 게시판 페이지로 뒤로가기 함수
    const backToList = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold text-green-700 my-5">글쓰기</h2>
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
                <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={saveBoard}>저장</button>
                <button className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={backToList}>취소</button>
            </div>

        </div>
    )

    
}
export default BoardWrite;