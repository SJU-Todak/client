import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LandingPage.css';
import logoImg from '../assets/logo.png';
import todakiImg from '../assets/todaki.png';
import googleLoginImg from '../assets/google_login.png';
import chatUiImg from '../assets/landing_chat.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-left">
        <img src={logoImg} alt="토닥이 로고" className="logo-img" />
        <img src={todakiImg} alt="토닥이 캐릭터" className="todaki-img" />
        <div className="landing-title">라이프 코칭을 통한<br />멘탈 케어 시스템</div>
        <img
          src={googleLoginImg}
          alt="Google 로그인"
          className="google-login-btn"
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="landing-right">
        <img src={chatUiImg} alt="채팅 UI" className="chat-ui-img" />
      </div>
    </div>
  );
};

export default LandingPage; 