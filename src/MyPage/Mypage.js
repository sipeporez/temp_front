import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPopUp from "../Login/PasswordPopUp";


const MyPage = () => {

    const [popUpOpen, setPopUpOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenPopUp = () => {
        setPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setPopUpOpen(false);
    };

    //로그아웃 처리 함수

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        alert("로그아웃 되었습니다.");
        window.location.href = "/";  // "/"로 리디렉션하고 전체 새로고침
        //navigate("/"); window.location.reload(); (방법2)
    }

    const handleViewMyBoards = () => {
        navigate('/mypage/boardlist');
    }


    return (
        <div>
            <h2 className="text-center text-5xl font-bold text-green-700 my-10">마이페이지</h2>
            <div>
                <button onClick={handleLogout}
                    className="bg-zinc-500 text-white px-4 py-2 mx-1 rounded-md hover:bg-green-400"
                >로그아웃
                </button>
                <button
                    onClick={handleOpenPopUp}
                    className="bg-green-500 text-white px-4 py-2 mx-1
                    rounded-md hover:bg-green-600"
                >
                    회원정보
                </button>
                <button
                    onClick={handleViewMyBoards}
                    className="bg-emerald-600 text-white px-4 py-2 mx-1
                    rounded-md hover:bg-emerald-700">
                    내가 쓴 게시글
                </button>
                {popUpOpen && <PasswordPopUp onClose={handleClosePopUp} />}
                {/* 팝업이 켜져있을때 닫아야하니까 닫기 */}
            </div>
        </div>
    )
}
export default MyPage;