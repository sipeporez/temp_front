import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemovePopUp from "./RemovePopUp";

const url = process.env.REACT_APP_API_URL;

const UserProfile = () => {

    const [nickname, setNickname] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [removeConfirm, setRemoveConfirm] = useState(false);
    const [userNickname, setUserNickname] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {

            await fetch(url + "mypage/info", {
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        return resp.json(); // 요청 성공하면 응답 데이터를 다음 then 체인의 data에 반환
                    } else {
                        return Promise.reject();
                    }
                })
                .then((data) => {
                    console.log(data);
                    setNickname(data.nickname);
                })
                .catch(() => {
                    alert("정보를 불러오는데 실패했습니다.");
                })
        };
        fetchUserInfo();
    }, []); // 회원정보를 클릭하면 UserProfile이 마운트되고 처음 한번만 fetchUserInfo() 함수를 호출


    //로그아웃 처리 함수

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        alert("로그아웃 되었습니다.");
        window.location.href = "/";  // "/"로 리디렉션하고 전체 새로고침
        //navigate("/"); window.location.reload(); (방법2)
    }



    // 닉네임 변경 함수
    const handleNicknameChange = async (e) => {
        e.preventDefault();

        if (!nickname) { //공백입력시 
            alert('새 닉네임을 입력하세요.')
            return;
        }

        if (nickname.length > 16) {
            alert('닉네임 16자를 초과했습니다.')
            return;
        }

        await fetch(url + "mypage/changenick",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nickname: nickname,
                }),
            }
        )
            .then((resp) => {
                if (resp.status === 200) {
                    alert('닉네임 변경이 완료되었습니다.');
                    navigate('/mypage')
                } else {
                    alert('닉네임 변경이 실패했습니다. 다시 시도해 주세요.')
                    return;
                }
            })


    };

    // 비밀번호 변경 함수
    const handlePasswordChange = async () => {
        if (!newPassword && !newConfirmPassword) { //공백입력시 
            alert('새 비밀번호를 입력하세요.')
            return;
        }

        if (newPassword.length > 16) {
            alert('비밀번호 16자 이내로 입력하세요.')
            return;
        }

        else if (newPassword !== newConfirmPassword) {
            alert('비밀번호를 확인해주세요.')
            return;
        }


        await fetch(url + "mypage/changepw",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    password: newPassword
                })
            }
        ).then((resp) => {
            if (resp.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.')
            } else {
                alert('비밀번호 변경에 실패했습니다.')
                return;
            }
        })
    }


    // 랜덤 닉네임 생성 함수
    const generateRandomNickname = async () => {
        // async: 비동기 함수이며, 항상 Promise를 반환한다.
        const resp = await fetch(url + "mypage/randomnick");
        // 함수내에서 await을 사용해서 비동기작업의 완료를 기다린다. fetch 요청에 성공하면 Promise는 Response를 반환하며 resp에 반환된 값이 저장됨
        // 비동기작업이 완료될때까지 코드를 일시 정지시키는 것
        return await resp.text(); // 텍스트로 변환될때까지 기다리고 반환

    }

    // 랜덤 닉네임을 인풋박스에 넣는 함수
    const handleRandomNickname = async () => {
        const randomNick = await generateRandomNickname(); // 현재 randomNick에 mypage/randomnick의 text를 저장
        setNickname(randomNick); // 닉네임에 저장하면 nickName에 출력된다
    }

    const handleRemoveAccount = async () => {
        await fetch(url + 'mypage/removeacc', {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem("token")
                //세션저장소에서 token이라는 키로 저장된 값을 가져옴
            }
        })
            .then((resp) => { // 서버 요청 성공 후 응답
                if (resp.status === 200) { // 서버 요청 성공 후 응답이 되면,
                    alert('회원탈퇴가 완료되었습니다.');
                    sessionStorage.removeItem("token"); // 현재 토큰 제거
                    navigate('/');
                } else {
                    alert('회원탈퇴에 실패했습니다.');
                }
            });
    };


    return (
        <div>
            <h2 className="text-center text-5xl font-bold text-green-700 my-10">회원정보</h2>
            <div className="form">
                <label>닉네임</label>
                <input class="text-center"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="새로운 닉네임 입력" />
                <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-1"
                    type="button" onClick={handleRandomNickname}>랜덤 닉네임</button>
                <button className="bg-green-500 text-white text-sm py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-1"
                    onClick={handleNicknameChange}>변경</button>

            </div>
            <div className="form">
                <label>새 비밀번호</label>
                <input class="text-center"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호" />
                <br />
                <label>새 비밀번호 확인</label>
                <input class="text-center"
                    type="password"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호 확인" />
                <button className="bg-green-500 text-white text-sm py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-1"
                    onClick={handlePasswordChange}>변경</button>
            </div>

            <div>
                <button className="bg-green-600 text-white text-sm py-1 px-3 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 ml-1"
                    onClick={handleLogout}>로그아웃</button>
            </div>
            <button
                className="bg-red-600 text-white text-sm py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 ml-1 my-1"
                onClick={() => setRemoveConfirm(true)}
            >
                회원탈퇴
            </button>
            {removeConfirm && (
                <RemovePopUp
                    onFlag={1}
                    onConfirm={handleRemoveAccount}
                    onCancel={() => setRemoveConfirm(false)}
                />
            )}
        </div>
    )
}
export default UserProfile;