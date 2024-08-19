import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom"
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const PasswordPopUp = ({onClose}) => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        await axios.post(url + "mypage/checkpw", 
            { password }, 
            { headers: 
                {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token"),
                }
            }
        )
        .then((resp) => { // 서버 요청에 성공 후 응답(resp)
            if (resp.status === 200) { // 응답 성공 시 
                navigate("/mypage/userProfile"); // navigate를 통해 userProfile(회원정보) 컴포넌트로 이동
                onClose(); // 이후 팝업은 닫는다(사용자 정의함수)
            } else {
                alert("비밀번호가 일치하지 않습니다.") 
            }
        })

        
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">비밀번호 확인</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        className="border border-gray-300 p-2 w-full rounded-md mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        확인
                    </button>
                </form>
                <button
                    onClick={onClose} // 닫기버튼 누르면 부모컴포넌트에서 선언해둔 onClose 함수 호출
                    className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    닫기
                </button>
            </div>
        </div>,
        document.body
    )
}
export default PasswordPopUp;