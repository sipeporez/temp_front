import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";
const url = process.env.REACT_APP_API_URL;

const MyBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBoards = async () => {
            await axios.get(`${url}mypage/boardlist`,
                {
                    headers: {
                        'Authorization': sessionStorage.getItem("token")
                    }
                }
            )
                .then((resp) => {
                    if (resp.status === 200) {
                        setBoards(resp.data.content);
                    } else {
                        alert("게시글을 가져오는 데 실패했습니다.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                })
        };
        fetchMyBoards();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-center text-5xl font-bold text-green-700 my-10">내가 쓴 게시글</h2>
            <ul>
                {boards.length === 0 ? (
                    <p>작성한 게시글이 없습니다.</p>
                ) : (
                    boards.map((board) => (
                        <li key={board.idx} className="flex space-x-3 mb-2">
                            {board.idx}
                            <Link
                                to={`/board/view?idx=${board.idx}`}
                                className="text-blue-500 hover:text-blue-700"
                            >
                            {board.title}
                            </Link>
                            {board.nickname}
                            {board.create_Date.replace('T', '/').slice(0, 16)}
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyBoards;