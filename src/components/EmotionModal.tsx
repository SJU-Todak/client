import React from 'react';
import '../styles/EmotionModal.css';

const emotionColors: { [key: string]: string } = {
  '기쁨': '#FFD700', // 밝은 노란색
  '짜증': '#FF6B6B', // 밝은 빨간색
  '슬픔': '#4A90E2', // 밝은 파란색
  '불안': '#9B59B6', // 보라색
  '화남': '#E74C3C', // 진한 빨간색
  '평온': '#2ECC71', // 초록색
  '피곤': '#95A5A6', // 회색
  '스트레스': '#F39C12', // 주황색
  '걱정': '#8E44AD', // 진한 보라색
  '행복': '#FFD700', // 밝은 노란색
  '짜증남': '#FF6B6B', // 밝은 빨간색
  '우울': '#4A90E2', // 밝은 파란색
  '불안함': '#9B59B6', // 보라색
  '화가남': '#E74C3C', // 진한 빨간색
  '편안함': '#2ECC71', // 초록색
  '지침': '#95A5A6', // 회색
  '스트레스받음': '#F39C12', // 주황색
  '걱정됨': '#8E44AD', // 진한 보라색
};

interface EmotionModalProps {
  onClose: () => void;
  onSelectEmotion: (emotion: string) => void;
  emotions: string[];
}

const EmotionModal: React.FC<EmotionModalProps> = ({ onClose, onSelectEmotion, emotions }) => {
  return (
    <div className="emotion-modal-overlay">
      <div className="emotion-modal">
        <h2>오늘의 감정을 선택해주세요</h2>
        <div className="emotion-grid">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              className="emotion-button"
              onClick={() => onSelectEmotion(emotion)}
            >
              <div 
                className="emotion-circle" 
                style={{ backgroundColor: emotionColors[emotion] || '#95A5A6' }}
              />
              <span>{emotion}</span>
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default EmotionModal; 