import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AnalysisPage.css';
import '../MainPage.css';
import logoImg from '../assets/logo.png';
import html2canvas from 'html2canvas';
import { FaRegSmile, FaRegFrown, FaRegAngry, FaRegMeh, FaRegGrinStars } from 'react-icons/fa';

// 예시 데이터 (props로 받을 수도 있음)
const reportData = {
  missionTopic: '친구들과의 관계에서 느끼는 실망과 분노, 그리고 과거의 경험이 현재의 감정에 미치는 영향 탐구',
  missionEmotion: {
    '슬픔': 40,
    '분노': 30,
    '불안': 15,
    '기쁨': 10,
    '짜증': 5
  },
  missionDistortion: [
    {
      name: '과잉일반화',
      example: '우리 집이 잘 못 산다는 것을 친구들이 알게 되었을 때 정말 억장이 무너지는 것 같았어.',
      explanation: '한 번의 경험을 바탕으로 모든 친구들과의 관계에서 부정적인 감정을 일반화하고 있음.',
      advice: '모든 친구가 같은 반응을 보이지 않을 수 있다는 점을 기억해주세요. 각 상황은 다르니까요.'
    },
    {
      name: '감정적 추론',
      example: '화나는데 직접 말하기는 뭔가 미안하다랄까.',
      explanation: '감정을 사실로 받아들이고, 그로 인해 행동을 제한하고 있음.',
      advice: '감정은 중요한 신호이지만, 반드시 그 감정에 따라 행동할 필요는 없어요. 감정을 표현하는 방법을 찾아보세요.'
    }
  ],
  mainMission: {
    title: '감정 표현 연습',
    detail: '내 감정을 솔직하게 표현하는 연습을 해보세요. 매일 감정을 기록하고, 그 감정을 친구에게 전달하는 방법을 고민해보세요. 예를 들어, 하루에 한 번 감정을 적고, 그 중 하나를 친구에게 메시지로 보내는 것입니다. 이 미션은 2주 동안 진행해보세요.',
    횟수: '매일 1회',
    기간: '2주'
  },
  subMission: [
    {
      title: '감정 일기 쓰기',
      detail: '매일 느낀 감정을 기록하세요. 감정의 원인과 그에 대한 반응을 적어보세요. 이를 통해 자신의 감정을 더 잘 이해할 수 있습니다.'
    },
    {
      title: '긍정적인 경험 회상하기',
      detail: '하루에 한 번, 긍정적인 경험이나 감정을 떠올려보세요. 그 경험이 왜 긍정적이었는지 적어보세요.'
    },
    {
      title: '친구와의 대화 연습',
      detail: '가까운 친구와 감정에 대해 이야기하는 시간을 가져보세요. 자신의 감정을 솔직하게 나누고, 친구의 감정도 들어보는 기회를 만들어보세요.'
    }
  ]
};

const emotionColors = {
  '슬픔': '#7a7bd5',
  '분노': '#f77b7b',
  '불안': '#f7c873',
  '기쁨': '#b7e397',
  '짜증': '#f3d87e'
};

const emotionIcons = {
  '슬픔': <FaRegFrown color="#7a7bd5" size={20} />,
  '분노': <FaRegAngry color="#f77b7b" size={20} />,
  '불안': <FaRegMeh color="#f7c873" size={20} />,
  '기쁨': <FaRegGrinStars color="#b7e397" size={20} />,
  '짜증': <FaRegSmile color="#f3d87e" size={20} />
};

const cardStyle = {
  background: 'rgba(255,255,255,0.82)',
  borderRadius: 16,
  boxShadow: '0 2px 16px rgba(122,123,213,0.07)',
  padding: '28px 28px 24px 20px',
  marginBottom: 28,
  backdropFilter: 'blur(4px)'
} as React.CSSProperties;

const AnimatedBar = ({ value, color, label, icon }: { value: number, color: string, label: string, icon: React.ReactNode }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => setWidth(value), 100);
  }, [value]);
  return (
    <div style={{display:'flex',alignItems:'center',marginBottom:18}}>
      <span style={{width:32,display:'flex',justifyContent:'center',alignItems:'center',fontSize:20}}>{icon}</span>
      <span style={{width:48, color:'#444', fontWeight:500, fontSize:15}}>{label}</span>
      <div style={{
        flex:1, height:16, background:'rgba(230,238,250,0.5)', borderRadius:10, overflow:'hidden', marginRight:12, marginLeft:8,
        position:'relative'
      }}>
        <div style={{
          width: `${width}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color} 60%, #fff 100%)`,
          borderRadius: 10,
          transition: 'width 1.1s cubic-bezier(.4,2,.6,1)',
          boxShadow: '0 2px 8px 0 rgba(122,123,213,0.07)'
        }} />
      </div>
      <span style={{width:32, textAlign:'right', color:'#222', fontWeight:700, fontSize:15}}>{value}</span>
    </div>
  );
};

const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRecord, setSelectedRecord] = useState(0); // 기록 선택 인덱스
  const reportRef = useRef<HTMLDivElement>(null);

  // 다운로드 기능
  const handleDownload = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current);
      const link = document.createElement('a');
      link.download = 'report.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 기록 리스트 예시 (turn 필드 추가)
  const recordList = [
    { text: '지원이와 학교생활 고민 상담', turn: 18 },
    { text: '여름씨와 취준 고민 상담', turn: 12 },
    { text: '서연쌤과 우울증 치료 상담', turn: 21 }
  ];

  return (
    <div className="analysis-root" style={{background: 'linear-gradient(120deg, #f6f8f7 60%, #e6eefa 100%)'}}>
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
      <div className="analysis-content">
        {/* 좌측 기록 영역 */}
        <aside className="record-section">
          <div className="record-title-row">
            <div className="record-title">기록</div>
          </div>
          <div className="record-list">
            {recordList.map((item, idx) => {
              const isActive = item.turn >= 15;
              return (
                <div
                  className={`record-item${selectedRecord === idx && isActive ? ' selected' : ''}${!isActive ? ' disabled' : ''}`}
                  key={idx}
                  onClick={() => isActive && setSelectedRecord(idx)}
                  style={
                    selectedRecord === idx && isActive
                      ? {}
                      : !isActive
                      ? { cursor: 'not-allowed', position: 'relative' }
                      : {}
                  }
                  onMouseEnter={e => {
                    if (!isActive) {
                      const tooltip = document.createElement('div');
                      tooltip.className = 'record-tooltip';
                      tooltip.innerText = '15턴이 넘지 않는 대화는 레포트 생성이 불가능해요.';
                      e.currentTarget.appendChild(tooltip);
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const tooltip = e.currentTarget.querySelector('.record-tooltip');
                      if (tooltip) e.currentTarget.removeChild(tooltip);
                    }
                  }}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </aside>
        {/* 우측 레포트 영역 */}
        <section className="chat-section">
          <button className="download-btn" style={{
            position:'absolute', top:32, right:32, background:'#fff', border:'none', borderRadius:12, padding:10, cursor:'pointer',
            boxShadow:'0 2px 8px rgba(122,123,213,0.10)', transition:'box-shadow 0.2s'
          }} onClick={handleDownload}>
            <span role="img" aria-label="다운로드" style={{fontSize:22}}>⬇️</span>
          </button>
          <div ref={reportRef} style={{width: '100%', maxWidth: 620, margin:'0 auto'}}>
            {/* 미션 주제 */}
            <h2 style={{
              fontSize:'1.35rem', fontWeight:800, marginBottom:30, color:'#222', lineHeight:1.5,
              letterSpacing: '-0.5px', textShadow:'0 1px 0 #fff'
            }}>
              {reportData.missionTopic}
            </h2>
            {/* 감정 분석 그래프 */}
            <div style={cardStyle}>
              <div style={{fontWeight:700, color:'#7a7bd5', fontSize:'1.08rem', marginBottom:18, letterSpacing:'-0.5px'}}>감정 분석</div>
              {Object.entries(reportData.missionEmotion).map(([emotion, value]) => (
                <AnimatedBar
                  key={emotion}
                  value={value}
                  color={emotionColors[emotion as keyof typeof emotionColors]}
                  label={emotion}
                  icon={emotionIcons[emotion as keyof typeof emotionIcons]}
                />
              ))}
            </div>
            {/* 미션 카드 */}
            <div style={cardStyle}>
              <div style={{fontWeight:700, color:'#b7e397', fontSize:'1.08rem', marginBottom:18}}>미션</div>
              <div style={{marginBottom:14}}>
                <div style={{fontWeight:700, fontSize:'1.07rem', marginBottom:7}}>{reportData.mainMission.title}</div>
                <div style={{color:'#444', marginBottom:8, fontSize:'1.01rem'}}>{reportData.mainMission.detail}</div>
                <div style={{color:'#888', fontSize:'0.98rem'}}>횟수: {reportData.mainMission.횟수} / 기간: {reportData.mainMission.기간}</div>
              </div>
              <ul style={{marginLeft:18, color:'#444', fontSize:'1.01rem', paddingLeft:0}}>
                {reportData.subMission.map((m, i) => (
                  <li key={i} style={{
                    marginBottom:7, listStyle:'none', display:'flex', alignItems:'center', gap:8
                  }}>
                    <span><b>{m.title}</b>: {m.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 인지 왜곡 카드 */}
            <div style={cardStyle}>
              <div style={{fontWeight:700, color:'#f77b7b', fontSize:'1.08rem', marginBottom:18}}>인지 왜곡</div>
              {reportData.missionDistortion.map((d, i) => (
                <div key={i} style={{
                  marginBottom:20, borderBottom: i !== reportData.missionDistortion.length-1 ? '1px solid #f0f0f0' : 'none', paddingBottom:16
                }}>
                  <div style={{fontWeight:700, color:'#444', marginBottom:4, fontSize:'1.05rem'}}>{d.name}</div>
                  <blockquote style={{
                    margin:'8px 0 10px 0', color:'#7a7bd5', fontWeight:600, fontSize:'1.04rem',
                    borderLeft:'5px solid #e6eefa', paddingLeft:16, background:'#f8faff', borderRadius:8
                  }}>{d.example}</blockquote>
                  <div style={{color:'#444', fontSize:'1.01rem', marginBottom:5}}>&rarr; {d.explanation}</div>
                  <div style={{
                    color:'#888', fontSize:'0.98rem', background:'#f6f8f7', borderRadius:8, padding:'8px 14px', marginTop:5,
                    borderLeft:'4px solid #b7e397'
                  }}>{d.advice}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalysisPage; 