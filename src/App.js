import { useState } from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCog, FaUserPlus } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import BoardDetail from './Board/BoardDetail';
import BoardEdit from './Board/BoardEdit';
import BoardList from './Board/BoardList';
import BoardWrite from './Board/BoardWrite';
import ZoomPanComponent from './ImageMap/Pan';
import LoginPage from './Login/LoginPage';
import SignupPage from './Login/SignupPage';
import MyBoards from './MyPage/MyBoards';
import MyPage from './MyPage/Mypage';
import UserProfile from './MyPage/UserProfile';

function App() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // 아코디언 열림 닫힘여부, (초기상태는 닫힘(false))
  

  // 로그인 인증된 사용자는 로그아웃, 마이페이지 아코디언이 보이고,
  // 로그인 인증되지않은 사용자는 로그인, 회원가입이 보인다
  const checkLogin = () => {
    if (sessionStorage.getItem("token") != null) {
      // 토큰값이 null이 아니면(로그인된 상태), 다음 태그를 아코디언에 출력
      return (
        <ul className='mt-2 space-y-2 pl-4'>
          <li>
            <button
              onClick={() => {
                sessionStorage.removeItem("token"); // 세션 저장소에서 토큰 제거
                alert('로그아웃 되었습니다.');
                window.location.href = "/"; // 홈 페이지로 이동 및 페이지 새로 고침
              }}
              className='flex items-center space-x-2 text-black hover:text-gray-400 transition-colors hover:bg-white'>
              <FaSignOutAlt className='text-lg' />
              <span>로그아웃</span>
            </button>
          </li>
          <li>
            <Link
              to="./mypage"
              className='flex items-center space-x-2 text-black hover:text-gray-400 transition-colors hover:bg-white'>
              <FaUserCog className='text-lg' />
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>

      )
    }
    else return ( // 토큰값이 null이면(로그인 안된 상태) 다음 태그를 아코디언에 출력
      <ul className='mt-2 space-y-2 pl-4'>
        <li>
          <Link
            to="/login"
            className='flex items-center space-x-2 text-black hover:text-gray-400 transition-colors hover:bg-white'>
            <FaSignInAlt className='text-lg' />
            <span>로그인</span>
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className='flex items-center space-x-2 text-black hover:text-gray-400 transition-colors hover:bg-white'>
            <FaUserPlus className='text-lg' />
            <span>회원가입</span>
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <RecoilRoot>
    <BrowserRouter>
      <div className="flex flex-col w-full mt-32 max-w-screen-xl mx-auto">
      <header className='w-full flex justify-between items-center text-xl font-bold p-4 bg-green-400 fixed top-0 left-0 z-10'
          style={{ height: '10vh' }}>
          <ul className='flex justify-center items-center text-sm'>
            <li className='mx-2 p-2 rounded-md
                         transition-colors hover:text-white'>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <FaHome style={{ marginRight: '8px', fontSize: '40px' }} />
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className='flex items-center space-x-2 transition-colors hover:text-white'>
                <FaUser style={{ marginLeft: '10px', marginRight: '10px', fontSize: '30px' }} />
              </button>
              {isAccordionOpen &&
                checkLogin()
              }
            </li>
          </ul>
        </header>
        <main className='w-full flex justify-center items-center bg-white'> {/* Padding adjusted using viewport units */}
          <Routes>
            <Route path='/' element={<ZoomPanComponent />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/board' element={<BoardList />} />
            <Route path='/board/view' element={<BoardDetail />} />
            <Route path='/write' element={<BoardWrite />} />
            <Route path='/edit' element={<BoardEdit />} />
            <Route path='/mypage/userProfile' element={<UserProfile />} />
            <Route path='/mypage/boardlist' element={<MyBoards />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;


