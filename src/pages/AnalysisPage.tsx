import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../AnalysisPage.css';
import logoImg from '../assets/logo.png';

const keywords = [
  { word: '학업', count: 1235 },
  { word: '진로', count: 1093 },
  { word: '우울', count: 932 },
  { word: '불안', count: 702 },
  { word: '대학', count: 529 },
  { word: '성적', count: 429 },
  { word: '상처', count: 343 },
  { word: '친구', count: 311 },
  { word: '슬프다', count: 285 },
  { word: '절망', count: 186 },
];

const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="analysis-root">
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
      <div className="analysis-container">
        {/* 나의 주요 고민 카드 */}
        <div className="analysis-card">
          <div className="analysis-card-header">
            <span className="analysis-card-title" style={{color:'#7a7bd5'}}>나의 주요 고민</span>
            <span className="analysis-period">기간 | 2022.03.01~2022.09.12 <span className="calendar-ico">📅</span></span>
          </div>
          <div className="analysis-card-content">
            <div className="wordcloud-area">
              {/* 배경 원 */}
              <svg className="wordcloud-bg-circles" width="260" height="180">
                <circle cx="130" cy="90" r="80" fill="#7a7bd5" opacity="0.07" />
                <circle cx="130" cy="90" r="50" fill="#7a7bd5" opacity="0.07" />
              </svg>
              {/* 중앙 단어 */}
              <span className="wordcloud-word center" style={{}}>학업</span>
              {/* 1계층 */}
              <span className="wordcloud-word big" style={{left:'50%',top:'22%',transform:'translate(-50%,0)'}}>진로</span>
              <span className="wordcloud-word big" style={{left:'75%',top:'38%'}}>상처</span>
              <span className="wordcloud-word big" style={{left:'68%',top:'60%'}}>우울</span>
              <span className="wordcloud-word big" style={{left:'32%',top:'60%'}}>성적</span>
              <span className="wordcloud-word big" style={{left:'25%',top:'38%'}}>불안</span>
              <span className="wordcloud-word big" style={{left:'50%',top:'75%',transform:'translate(-50%,0)'}}>친구</span>
              <span className="wordcloud-word big" style={{left:'70%',top:'28%'}}>대학</span>
              {/* 2계층 */}
              <span className="wordcloud-word mid" style={{left:'60%',top:'15%'}}>연애</span>
              <span className="wordcloud-word mid" style={{left:'80%',top:'50%'}}>외로움</span>
              <span className="wordcloud-word mid" style={{left:'60%',top:'80%'}}>좌절</span>
              <span className="wordcloud-word mid" style={{left:'40%',top:'80%'}}>슬프다</span>
              <span className="wordcloud-word mid" style={{left:'20%',top:'50%'}}>노력</span>
              <span className="wordcloud-word mid" style={{left:'40%',top:'15%'}}>분노</span>
              {/* 3계층 */}
              <span className="wordcloud-word small" style={{left:'30%',top:'30%'}}>짜증</span>
              <span className="wordcloud-word small" style={{left:'70%',top:'70%'}}>죽고</span>
              <span className="wordcloud-word small" style={{left:'60%',top:'40%'}}>자해</span>
              <span className="wordcloud-word small" style={{left:'80%',top:'30%'}}>절망</span>
              <span className="wordcloud-word small" style={{left:'20%',top:'70%'}}>무기력</span>
              <span className="wordcloud-word small" style={{left:'30%',top:'70%'}}>어렵다</span>
              <span className="wordcloud-word small" style={{left:'60%',top:'60%'}}>자살</span>
            </div>
            {/* 키워드 랭킹 테이블 */}
            <div className="keyword-rank-area">
              <table className="keyword-table">
                <thead>
                  <tr><th>키워드</th><th>상담건</th></tr>
                </thead>
                <tbody>
                  {keywords.map((k, i) => (
                    <tr key={i}><td>{i+1}. {k.word}</td><td>{k.count}건</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* 나의 정신건강 변화 카드 */}
        <div className="analysis-card" style={{marginTop: 32}}>
          <div className="analysis-card-header">
            <span className="analysis-card-title" style={{color:'#7a7bd5'}}>나의 정신건강 변화</span>
          </div>
          <div className="analysis-card-content">
            <div className="chart-area">
              <div className="chart-y-labels">
                <div>150</div><div>125</div><div>100</div><div>75</div><div>50</div><div>25</div><div>0</div>
              </div>
              <svg width="600" height="140" style={{background:'none'}}>
                {/* good (노랑) */}
                <polyline fill="none" stroke="#b7e397" strokeWidth="3" points="0,40 200,30 400,60 600,80" />
                {/* caution (주황) */}
                <polyline fill="none" stroke="#f7c873" strokeWidth="3" points="0,80 200,70 400,100 600,120" />
                {/* danger (빨강) */}
                <polyline fill="none" stroke="#f77b7b" strokeWidth="3" points="0,120 200,130 400,110 600,105" />
              </svg>
              <div className="chart-x-labels">
                <div>2022/6</div><div>2022/7</div><div>2022/8</div><div>2022/9</div>
              </div>
              <div className="chart-legend">
                <span><span className="legend-dot" style={{background:'#b7e397'}}></span>양호</span>
                <span><span className="legend-dot" style={{background:'#f7c873'}}></span>주의</span>
                <span><span className="legend-dot" style={{background:'#f77b7b'}}></span>위험</span>
              </div>
              <div className="chart-unit">단위(명)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage; 