import React from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../ModalAtom'; // Recoil 상태 관리 파일을 임포트

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useRecoilState(modalAtom);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalOverlayStyle}>
      <div className='w-4/5 h-4/5' style={modalContentStyle}>
        <button onClick={() => setIsOpen(false)} style={closeButtonStyle}>Close</button>
        {children}
      </div>
    </div>,
    document.body // 모달을 body 태그에 렌더링합니다.
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 50,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Modal;
