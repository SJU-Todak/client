import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import defaultProfileImg from '../assets/profile_default.png';
import logoImg from '../assets/logo.png';

const mockEmail = 'djsfds@google.com';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<string>(defaultProfileImg);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [alarmAgree, setAlarmAgree] = useState(true);
  const [calendarAgree, setCalendarAgree] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => setEditMode(true);
  const handleComplete = () => setEditMode(false);

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfileImg(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="profile-root" style={{display:'flex',flexDirection:'column',alignItems:'center',minHeight:'100vh',background:'#fff'}}>
      <NavBar />
      <div style={{display:'flex',gap:40,alignItems:'flex-start',width:'100%',maxWidth:1100,margin:'40px auto 0 auto'}}>
        {/* 왼쪽 프로필 카드 */}
        <div className="profile-card" style={{background:'#fff',borderRadius:24,boxShadow:'0 2px 12px rgba(0,0,0,0.07)',padding:40,minWidth:340,maxWidth:400,flex:1}}>
          <div style={{fontWeight:600,fontSize:'1.13rem',marginBottom:18}}>프로필</div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:24}}>
            <div style={{position:'relative',width:110,height:110}}>
              <img src={profileImg} alt="프로필" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',background:'#e6eefa'}} />
              <button
                style={{position:'absolute',bottom:8,right:8,background:'#fff',border:'1.5px solid #eee',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}}
                onClick={() => fileInputRef.current?.click()}
                title="프로필 이미지 변경"
              >
                <span role="img" aria-label="카메라" style={{fontSize:20}}>📷</span>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{display:'none'}}
                onChange={handleProfileImgChange}
              />
            </div>
            <div style={{marginTop:16,fontSize:'1.05rem',color:'#444'}}>{mockEmail}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <label style={{fontWeight:500,fontSize:'1.05rem',color:'#333'}}>이름</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={!editMode}
              style={{padding:'10px 12px',border:'1.5px solid #eee',borderRadius:8,fontSize:'1rem',background:editMode?'#fff':'#f8f8f8'}}
            />
            <label style={{fontWeight:500,fontSize:'1.05rem',color:'#333'}}>나이</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              disabled={!editMode}
              style={{padding:'10px 12px',border:'1.5px solid #eee',borderRadius:8,fontSize:'1rem',background:editMode?'#fff':'#f8f8f8'}}
            />
            <label style={{fontWeight:500,fontSize:'1.05rem',color:'#333'}}>성별</label>
            <input
              type="text"
              value={gender}
              onChange={e => setGender(e.target.value)}
              disabled={!editMode}
              style={{padding:'10px 12px',border:'1.5px solid #eee',borderRadius:8,fontSize:'1rem',background:editMode?'#fff':'#f8f8f8'}}
            />
          </div>
          <button
            style={{marginTop:32,width:'100%',padding:'12px 0',background:'#888',color:'#fff',border:'none',borderRadius:8,fontSize:'1.08rem',fontWeight:500,cursor:'pointer',transition:'background 0.2s'}}
            onClick={editMode ? handleComplete : handleEdit}
          >
            {editMode ? '완료' : '수정'}
          </button>
        </div>
        {/* 오른쪽 서비스 동의 카드 */}
        <div className="service-card" style={{background:'#fff',borderRadius:20,boxShadow:'0 2px 12px rgba(0,0,0,0.07)',padding:'36px 38px',minWidth:320,maxWidth:340,flex:1,display:'flex',flexDirection:'column',gap:24}}>
          <div style={{fontWeight:600,fontSize:'1.13rem',marginBottom:18}}>서비스 동의</div>
          <ul style={{listStyle:'disc',paddingLeft:18,margin:0,marginBottom:18,color:'#222',fontSize:'1.05rem',fontWeight:500}}>
            <li style={{marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              알림 수신 동의
              <label className="switch">
                <input type="checkbox" checked={alarmAgree} onChange={()=>setAlarmAgree(v=>!v)} />
                <span className="slider round"></span>
              </label>
            </li>
            <li style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              구글 캘린더 연동 동의
              <label className="switch">
                <input type="checkbox" checked={calendarAgree} onChange={()=>setCalendarAgree(v=>!v)} />
                <span className="slider round"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      {/* 하단 로그아웃 버튼 */}
      <button style={{margin:'48px auto 0 auto',display:'block',background:'#888',color:'#fff',border:'none',borderRadius:8,fontSize:'1.08rem',fontWeight:500,padding:'14px 0',width:320,cursor:'pointer',transition:'background 0.2s'}}>로그아웃</button>
      {/* 스위치 스타일은 CSS에 추가 필요 */}
    </div>
  );
};

export default ProfilePage; 