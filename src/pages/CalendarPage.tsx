import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CalendarPage.css';
import logoImg from '../assets/logo.png';
import googleLoginImg from '../assets/google_login.png';

const emotionColors = {
  '슬픔': '#7a7bd5',
  '분노': '#f77b7b',
  '불안': '#f7c873',
  '기쁨': '#b7e397',
  '짜증': '#f3d87e'
};

const emotionIcons = {
  '슬픔': <span role="img" aria-label="슬픔">😢</span>,
  '분노': <span role="img" aria-label="분노">😡</span>,
  '불안': <span role="img" aria-label="불안">😰</span>,
  '기쁨': <span role="img" aria-label="기쁨">😊</span>,
  '짜증': <span role="img" aria-label="짜증">😤</span>
};

const calendarData = [
  { day: 11, emotion: '불안' },
  { day: 17, emotion: '보통' },
  { day: 21, emotion: '분노' },
  { day: 25, emotion: '보통' },
  { day: 28, emotion: '불안' },
  { day: 28, emotion: '행복' },
];

// 예시 일정 데이터
const dummyScheduleData = [
  { day: 11, title: '회의', time: '14:00' },
  { day: 17, title: '스터디', time: '19:00' },
  { day: 21, title: '병원 예약', time: '10:30' },
  { day: 28, title: '친구 생일', time: '18:00' },
];

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const year = 2025;
  const daysInMonth = 31;
  const firstDayOfWeek = 4; // 1일이 목요일(0:일~6:토)

  // 구글 연동 상태 및 일정 데이터
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [scheduleData, setScheduleData] = useState<{ day: number; title: string; time: string }[]>([]);
  // 감정 기록 상태
  const [emotionData, setEmotionData] = useState<{ day: number; emotion: string }[]>([...calendarData]);
  // 감정 입력 모달 상태
  const [emotionModal, setEmotionModal] = useState<{ open: boolean; day: number | null }>({ open: false, day: null });

  const handleGoogleSync = () => {
    // 실제 구현 시 구글 OAuth 인증 및 API 호출 필요
    setIsGoogleConnected(true);
    setScheduleData(dummyScheduleData);
  };

  // 감정 입력 모달 열기
  const openEmotionModal = (day: number) => {
    setEmotionModal({ open: true, day });
  };
  // 감정 입력 모달 닫기
  const closeEmotionModal = () => {
    setEmotionModal({ open: false, day: null });
  };
  // 감정 선택
  const handleEmotionSelect = (emotion: string) => {
    if (emotionModal.day) {
      setEmotionData(prev => {
        // 해당 날짜에 이미 감정이 있으면 교체, 없으면 추가
        const filtered = prev.filter(e => e.day !== emotionModal.day);
        return [...filtered, { day: emotionModal.day!, emotion }];
      });
      closeEmotionModal();
    }
  };

  // 달력 2차원 배열 생성
  const weeks: (null | { day: number; emotions: string[]; schedules: { title: string; time: string }[] })[][] = [];
  let day = 1;
  for (let w = 0; w < 6; w++) {
    const week: (null | { day: number; emotions: string[]; schedules: { title: string; time: string }[] })[] = [];
    for (let d = 0; d < 7; d++) {
      if ((w === 0 && d < firstDayOfWeek) || day > daysInMonth) {
        week.push(null);
      } else {
        // 해당 날짜의 감정들
        const emotions = emotionData.filter(e => e.day === day).map(e => e.emotion);
        // 해당 날짜의 일정들 (구글 연동 시에만 표시)
        const schedules = isGoogleConnected ? scheduleData.filter(s => s.day === day) : [];
        week.push({ day, emotions, schedules });
        day++;
      }
    }
    weeks.push(week);
  }

  return (
    <div className="calendar-root">
      {/* 네비게이션 바 */}
      <nav className="main-nav">
        <img src={logoImg} alt="토닥이 로고" className="main-logo" onClick={() => navigate('/main')} style={{cursor:'pointer'}} />
        <div className="main-menu">
          <span onClick={() => navigate('/main')} style={{cursor:'pointer'}}>채팅</span>
          <span onClick={() => navigate('/goals')} style={{cursor:'pointer'}}>목표</span>
          <span onClick={() => navigate('/analysis')} style={{cursor:'pointer'}}>분석</span>
          <span onClick={() => navigate('/calendar')} style={{cursor:'pointer'}}>캘린더</span>
          <span onClick={() => navigate('/test')} style={{cursor:'pointer'}}>심리검사</span>
        </div>
        <span className="profile-menu" style={{cursor:'pointer'}} onClick={() => navigate('/profile')}>프로필</span>
      </nav>
      <div className="calendar-container">
        <div className="calendar-header-row">
          <span className="calendar-year">{year}</span>
          <span className="calendar-month">May</span>
          <div className="calendar-legend">
            <span><span className="legend-dot" style={{background:emotionColors['슬픔']}}></span>슬픔</span>
            <span><span className="legend-dot" style={{background:emotionColors['분노']}}></span>분노</span>
            <span><span className="legend-dot" style={{background:emotionColors['불안']}}></span>불안</span>
            <span><span className="legend-dot" style={{background:emotionColors['기쁨']}}></span>기쁨</span>
            <span><span className="legend-dot" style={{background:emotionColors['짜증']}}></span>짜증</span>
          </div>
          <button className="google-sync-btn" onClick={handleGoogleSync} disabled={isGoogleConnected}>
            <img src={googleLoginImg} alt="Google" style={{width:22,verticalAlign:'middle',marginRight:8}} />
            {isGoogleConnected ? '연동 완료' : 'Google 캘린더 연동'}
          </button>
        </div>
        <div className="calendar-table">
          {weeks.map((week, wi) => (
            <div className="calendar-week" key={wi}>
              {week.map((cell, di) => (
                <div
                  className={`calendar-cell${cell ? '' : ' empty'}`}
                  key={di}
                  onClick={cell ? () => openEmotionModal(cell.day) : undefined}
                  style={cell ? { cursor: 'pointer' } : {}}
                >
                  {cell && (
                    <>
                      <div className="calendar-day-num">{cell.day}</div>
                      <div className="calendar-emotions">
                        {cell.emotions.length > 0 && (
                          <div
                            className="calendar-emotion-bar"
                            style={{background: emotionColors[cell.emotions[cell.emotions.length - 1] as keyof typeof emotionColors]}}
                          />
                        )}
                      </div>
                      {/* 일정 라벨 표시 */}
                      {cell.schedules.length > 0 && (
                        <div className="calendar-schedules">
                          {cell.schedules.map((s, i) => (
                            <div className="calendar-schedule-label" key={i}>
                              {s.title} <span className="calendar-schedule-time">{s.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* 감정 입력 모달 */}
        {emotionModal.open && (
          <div style={{
            position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.18)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:18,padding:32,boxShadow:'0 2px 16px rgba(0,0,0,0.13)',display:'flex',flexDirection:'column',alignItems:'center',minWidth:260, position:'relative'}}>
              {/* X 버튼 */}
              <button
                onClick={closeEmotionModal}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  fontSize: 22,
                  color: '#bbb',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1
                }}
                aria-label="닫기"
              >✕</button>
              {/* 안내문구 (볼드X) */}
              <div style={{fontWeight:400,fontSize:'1.13rem',marginBottom:18, letterSpacing:'-0.5px', color:'#222'}}>감정을 선택해 주세요</div>
              <div style={{display:'flex',gap:16,marginBottom:18}}>
                {['슬픔','분노','불안','기쁨','짜증'].map(emotion => (
                  <button
                    key={emotion}
                    style={{
                      background:emotionColors[emotion as keyof typeof emotionColors],
                      border:'none',
                      borderRadius:10,
                      padding:'10px 18px',
                      fontWeight:400,
                      fontSize:'1.05rem',
                      color:'#333',
                      cursor:'pointer',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
                      display:'flex',
                      alignItems:'center',
                      gap:8
                    }}
                    onClick={() => handleEmotionSelect(emotion)}
                  >
                    <span style={{fontSize:22}}>{emotionIcons[emotion as keyof typeof emotionIcons]}</span>
                    {emotion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage; 