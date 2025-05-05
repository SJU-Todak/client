import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="main-nav" style={{width:'100%',maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',padding:'24px 0 0 40px',background:'#fff',position:'relative',zIndex:100}}>
      <img src={logoImg} alt="토닥이 로고" className="main-logo" style={{width:110,marginRight:60,cursor:'pointer'}} onClick={() => navigate('/main')} />
      <div className="main-menu" style={{display:'flex',gap:48,fontSize:'1.25rem',color:'#444',fontWeight:500,flex:1}}>
        <span onClick={() => navigate('/main')} style={{cursor:'pointer'}}>채팅</span>
        <span onClick={() => navigate('/goals')} style={{cursor:'pointer'}}>목표</span>
        <span onClick={() => navigate('/analysis')} style={{cursor:'pointer'}}>분석</span>
        <span onClick={() => navigate('/calendar')} style={{cursor:'pointer'}}>캘린더</span>
        <span onClick={() => navigate('/test')} style={{cursor:'pointer'}}>심리검사</span>
      </div>
      <span className="profile-menu" style={{marginLeft:'auto',color:'#888',cursor:'pointer'}} onClick={() => navigate('/profile')}>프로필</span>
    </nav>
  );
};

export default NavBar; 