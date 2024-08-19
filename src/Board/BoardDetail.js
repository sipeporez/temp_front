import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

import { snoSel } from '../SnoAtom';
import { useRecoilValue } from 'recoil';

const url = process.env.REACT_APP_API_URL;


const BoardDetail = () => {
    
    const sno = useRecoilValue(snoSel);
    const navigate = useNavigate();
    const { search } = useLocation(); // 검색 url을 search 변수에 저장
    const params = new URLSearchParams(search); // URLSearchParams:search 변수에 들어있는 url 문자열의 파라미터들을 각각 인식해서 가지고 있는다. 이를 params에 저장
    const idx = params.get('idx');


    const [loading, setLoading] = useState(true); // loading 상태변수를 정의하고 초기값을 true로 선언, 데이터를 가져오는동안 로딩상태를 나태내기위한 용도
    const [board, setBoard] = useState({}); // board 상태 변수를 정의하고 빈 객체로 선언, 가져온 게시판 데이터를 저장하기 위한 용도

    const getBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = (await axios.get(`${url}board/view?idx=${idx}`));
            setBoard(resp.data) // resp에 가져온 데이터를 board 상태변수에 저장
        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("해당 게시물을 가져오는데 실패했습니다.")
            navigate(`/`);
        }
        finally {
            setLoading(false); // 데이터를 board 게시판에 저장했으므로 loading상태를 false로 설정해서 로딩이 완료됨
        }
    }


    useEffect(() => {
        getBoard();
    }, [idx, sno])

    if (loading) {
        return <Loading />;
    }

    const handleUpdate = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200) {
                navigate(`/edit?sno=${sno}&idx=${idx}`);
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 수정 할 수 없습니다.');
                return;
            }
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200 && window.confirm('게시글을 삭제하시겠습니까?')) {
                const delResp = await axios.post(`${url}delete?sno=${sno}&idx=${idx}`, '', {
                    headers: { 'Authorization': sessionStorage.getItem("token") }
                });
                if (delResp.status === 200) {
                    alert('게시물이 삭제되었습니다.');
                    navigate(-1);
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 삭제할 수 없습니다.');
            }
        }
    };

    const handleList = () => {
        navigate(-1);
    }



    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-5xl font-bold text-green-700 my-10">게시물 상세</h2>
            </div>
            <div>
                <p>idx: {board.idx}</p>
                <p>title: {board.title}</p>
                <p>nickname: {board.nickname}</p>
                <p>create_Date: {board.create_Date.replace('T', '/').slice(0, 16)}</p>
                <p>content: {board.content}</p>
            </div>
            <div className="flex space-x-4">
                <button
                    className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={handleUpdate}
                >
                    수정
                </button>
                <button
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={handleDelete}
                >
                    삭제
                </button>
                <button
                    className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={handleList}
                >
                    목록
                </button>
            </div>
        </div>
    );
};

export default BoardDetail;