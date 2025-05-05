import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../InitialPage.css';
import logoImg from '../assets/logo.png';
import todakiImg from '../assets/todaki.png';

const questions = [
  '시험을 앞두고 잠들기 어렵거나 자주 깬다.',
  '시험을 앞두고 배가 아프거나 소화불량을 경험한다.',
  '시험 직전 심장이 빠르게 뛰거나 손에 땀이 난다.',
  '시험 중 머릿속이 하얘져서 문제를 읽지 못한다.',
  '좋은 성적을 받지 못할까봐 두려움을 느낀다.',
  '시험 중 실수할까봐 지나치게 긴장한다.',
  '시험을 생각하면 식욕이 줄어들거나 체중이 변한다.',
  '다른 사람들과 비교해 나의 시험 불안이 심하다고 느낀다.',
  '시험 이후에도 결과에 대해 지나치게 걱정하거나 후회한다.',
  '시험 준비 중 집중이 어렵고 산만한 상태가 지속된다.'
];

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleSelect = (idx: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers.every(ans => ans !== null)) {
      navigate('/main', { state: { ...location.state, testAnswers: answers } });
    }
  };

  return (
    <div className="initial-root">
      <nav className="main-nav">
        <img src={logoImg} alt="토닥이 로고" className="main-logo" onClick={() => navigate('/main')} style={{cursor:'pointer'}} />
      </nav>
      <div className="initial-container">
        {/* 왼쪽 채팅 영역 */}
        <div className="chat-section">
          <div className="chat-message">
            <img src={todakiImg} alt="토닥이" className="todaki-chat-img" />
            <div className="message-content">
              <div className="sender">토닥이</div>
              <div className="text">심리검사를 시작할게!<br/>각 문항에 대해 1~5점으로 선택해줘.</div>
            </div>
          </div>
        </div>
        {/* 오른쪽 검사 영역 */}
        <div className="input-section">
          <div className="test-questions">
            {questions.map((q, idx) => (
              <div className="test-question-row" key={idx}>
                <div className="test-question-text">{idx+1}. {q}</div>
                <div className="test-score-btns">
                  {[1,2,3,4,5].map(score => (
                    <button
                      key={score}
                      className={`test-score-btn${answers[idx] === score ? ' selected' : ''}`}
                      onClick={() => handleSelect(idx, score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="submit-btn"
            onClick={handleNext}
            disabled={answers.some(ans => ans === null)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 