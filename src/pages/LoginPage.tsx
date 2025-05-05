import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import googleLoginImg from '../assets/google_login.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    // 실제 구글 OAuth 연동 대신, 로그인 성공 시 바로 /initial로 이동
    navigate('/initial');
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      <img src={logoImg} alt="토닥이 로고" style={{width:140,marginBottom:40}} />
      <div style={{background:'#fff',borderRadius:24,boxShadow:'0 2px 12px rgba(0,0,0,0.07)',padding:'48px 60px',display:'flex',flexDirection:'column',alignItems:'center',gap:32}}>
        <h2 style={{fontWeight:700,fontSize:'1.5rem',marginBottom:24,color:'#333'}}>로그인</h2>
        <button
          onClick={handleGoogleLogin}
          style={{display:'flex',alignItems:'center',gap:12,padding:'12px 32px',background:'#fff',border:'1.5px solid #eee',borderRadius:12,fontSize:'1.08rem',fontWeight:500,cursor:'pointer',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}
        >
          <img src={googleLoginImg} alt="Google" style={{width:28}} />
          Google 계정으로 로그인
        </button>
        <div style={{width:'100%',display:'flex',flexDirection:'column',gap:16,marginTop:12}}>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            style={{padding:'12px',border:'1.5px solid #eee',borderRadius:8,fontSize:'1rem'}}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{padding:'12px',border:'1.5px solid #eee',borderRadius:8,fontSize:'1rem'}}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 