import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CalendarPage.css';
import logoImg from '../assets/logo.png';
import googleLoginImg from '../assets/google_login.png';

const emotionColors = {
  분노: '#f7c6e0',
  행복: '#d6efc7',
  불안: '#b7d6f7',
  보통: '#e0e0e0',
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
  const daysInMonth = 30;
  const firstDayOfWeek = 2; // 1일이 화요일(0:일~6:토)

  // 구글 연동 상태 및 일정 데이터
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [scheduleData, setScheduleData] = useState<{ day: number; title: string; time: string }[]>([]);

  const handleGoogleSync = () => {
    // 실제 구현 시 구글 OAuth 인증 및 API 호출 필요
    setIsGoogleConnected(true);
    setScheduleData(dummyScheduleData);
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
        const emotions = calendarData.filter(e => e.day === day).map(e => e.emotion);
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
          <span className="calendar-month">April</span>
          <div className="calendar-legend">
            <span><span className="legend-dot" style={{background:emotionColors['분노']}}></span>분노</span>
            <span><span className="legend-dot" style={{background:emotionColors['행복']}}></span>행복</span>
            <span><span className="legend-dot" style={{background:emotionColors['불안']}}></span>불안</span>
            <span><span className="legend-dot" style={{background:emotionColors['보통']}}></span>보통</span>
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
                <div className={`calendar-cell${cell ? '' : ' empty'}`} key={di}>
                  {cell && (
                    <>
                      <div className="calendar-day-num">{cell.day}</div>
                      <div className="calendar-emotions">
                        {cell.emotions.map((emo, i) => (
                          <div
                            key={i}
                            className="calendar-emotion-bar"
                            style={{background: emotionColors[emo as keyof typeof emotionColors]}}
                          />
                        ))}
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
      </div>
    </div>
  );
};

export default CalendarPage; 