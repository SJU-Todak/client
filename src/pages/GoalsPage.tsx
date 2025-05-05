import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../GoalsPage.css';
import logoImg from '../assets/logo.png';
import todakiImg from '../assets/todaki.png';

interface Goal {
  id: number;
  title: string;
  category: string;
  progress: number;
  isCompleted: boolean;
}

const GoalsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', category: '일상' });
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: '매일 30분 운동하기', category: '건강', progress: 60, isCompleted: false },
    { id: 2, title: '일주일에 책 1권 읽기', category: '학습', progress: 30, isCompleted: false },
    { id: 3, title: '하루 8잔 물 마시기', category: '건강', progress: 100, isCompleted: true },
  ]);

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        category: newGoal.category,
        progress: 0,
        isCompleted: false
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', category: '일상' });
      setShowAddModal(false);
    }
  };

  return (
    <div className="goalspage-root">
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

      <div className="goalspage-content">
        <div className="goals-section">
          <div className="goals-header">
            <h2>나의 목표</h2>
            <button className="add-goal-btn" onClick={() => setShowAddModal(true)}>+ 목표 추가</button>
          </div>
          
          <div className="goals-tabs">
            <button className="tab-btn active">진행 중</button>
            <button className="tab-btn">완료</button>
          </div>

          <div className="goals-list">
            {goals.filter(goal => !goal.isCompleted).map(goal => (
              <div key={goal.id} className="goal-item">
                <div className="goal-info">
                  <h3>{goal.title}</h3>
                  <span className="goal-category">{goal.category}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{width: `${goal.progress}%`}}></div>
                </div>
                <span className="progress-text">{goal.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="todaki-section">
          <img src={todakiImg} alt="토닥이" className="todaki-img" />
          <div className="todaki-level">Lv. 5</div>
          <div className="exp-bar">
            <div className="exp-progress" style={{width: '60%'}}></div>
          </div>
          <div className="exp-text">다음 레벨까지 40점</div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>새로운 목표 추가</h3>
            <input
              type="text"
              placeholder="목표를 입력하세요"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="goal-input"
            />
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
              className="category-select"
            >
              <option value="일상">일상</option>
              <option value="건강">건강</option>
              <option value="학습">학습</option>
              <option value="취미">취미</option>
            </select>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>취소</button>
              <button className="confirm-btn" onClick={handleAddGoal}>추가</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage; 