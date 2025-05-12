import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LandingPage.css';
import logoImg from '../assets/logo.png';
import todakiImg from '../assets/todaki.png';
import chatUiImg from '../assets/landing_chat.png';
import { FcGoogle } from 'react-icons/fc';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const name = 'Google';

  const handleGoogleLogin = () => {
    window.location.href = 'https://test-sso.online/auth/google';
  };

  return (
    <div className="landing-container">
      <div className="landing-left">
        <img src={logoImg} alt="토닥이 로고" className="logo-img" />
        <img src={todakiImg} alt="토닥이 캐릭터" className="todaki-img" />
        <div className="landing-title">라이프 코칭을 통한<br />멘탈 케어 시스템</div>
        <div className="font-roboto">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center mx-auto my-4 text-sm"
            style={{
              minWidth: 240,
              padding: '14px 0',
              background: '#fff',
              border: '1.5px solid #e0e0e0',
              borderRadius: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              transition: 'background 0.2s, border 0.2s',
              fontWeight: 600,
              gap: 16,
              outline: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#f8f8f8')}
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
          >
            <FcGoogle className="w-5 h-5 mr-5" style={{marginRight: 16}} />
            <span className="text-black-54 font-semibold">
              {name} 계정으로 로그인
            </span>
          </button>
          <span
            style={{
              color: '#3a7bd5',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '1rem',
              display: 'block',
              marginTop: 16
            }}
            onClick={() => navigate('/signup')}
          >
            회원가입
          </span>
        </div>
      </div>
      <div className="landing-right">
        <img src={chatUiImg} alt="채팅 UI" className="chat-ui-img" />
      </div>
    </div>
  );
};

export default LandingPage; 