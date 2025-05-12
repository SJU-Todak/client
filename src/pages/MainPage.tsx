import React, { useState, useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';
import '../MainPage.css';
import logoImg from '../assets/logo.png';
import todakiImg from '../assets/todaki.png';

interface Message {
  from: 'user' | 'persona' | 'todaki';
  text: string;
  personaName?: string;
  personaImg?: string;
}

interface Persona {
  name: string;
  desc: string;
  detail: string;
  img: string;
}

type RecordMessages = {
  [key: string]: Message[];
}

const personaList: Persona[] = [
  {
    name: '민지원',
    desc: '8세 남자아이',
    detail: '에너지가 넘치고 낙천적이며 밝은 기운을 가졌어요. 말투는 해맑고 순수하며, 항상 반말을 사용하고 문장은 짧고 단순합니다. 너무 깊은 분석이나 어른스러운 충고는 하지 않아요. 대신 아이의 시선으로 단순하게, 긍정적인 힘을 주는 말로 도와줘요.',
    img: 'https://em-content.zobj.net/source/apple/354/boy_1f466.png',
  },
  {
    name: '한여름',
    desc: '26세 여자',
    detail: '가까운 친구처럼 편안한 분위기를 만들며, 어려운 이야기도 털어놓을 수 있게 도와줘요. 부드럽고 자연스러운 반말이나 반존대를 사용해요. 상대의 감정을 잘 받아주며, 위로와 현실적인 조언을 함께 전해요.',
    img: 'https://em-content.zobj.net/source/apple/354/woman_1f469.png',
  },
  {
    name: '김서연',
    desc: '55세 심리상담 전문가',
    detail: '오랜 임상 경험과 상담 이론 지식을 갖춘 전문 심리상담가입니다. 말투는 신뢰감 있고 단정하며, 전문 용어와 개념을 사용하면서도 사용자가 이해할 수 있도록 배려하는 설명을 덧붙여요. 사용자가 스스로 감정을 이해하며 건강한 방향으로 나아가게 도와요.',
    img: 'https://em-content.zobj.net/source/apple/354/woman-teacher_1f469-200d-1f3eb.png',
  },
];

const recordList = [
  '지원이와 학교생활 고민 상담',
  '여름씨와 취준 고민 상담',
  '서연쌤과 우울증 치료 상담',
];

const recordMessages: RecordMessages = {
  '지원이와 학교생활 고민 상담': [
    { from: 'persona', text: '안녕하세요! 민지원입니다. 학교생활에 대해 이야기해볼까요?' },
    { from: 'user', text: '학교에서 친구들과 잘 지내기가 어려워요.' },
    { from: 'persona', text: '그렇구나. 친구들과 어떤 점이 어려운지 자세히 이야기해줄 수 있어?' }
  ],
  '여름씨와 취준 고민 상담': [
    { from: 'persona', text: '안녕하세요! 한여름입니다. 취업 준비하면서 힘든 점이 있나요?' },
    { from: 'user', text: '자소서 쓰는 게 너무 어려워요.' },
    { from: 'persona', text: '자소서 작성이 쉽지 않죠. 어떤 부분이 가장 어려운가요?' }
  ],
  '서연쌤과 우울증 치료 상담': [
    { from: 'persona', text: '안녕하세요. 김서연입니다. 오늘 기분은 어떠신가요?' },
    { from: 'user', text: '요즘 계속 우울해요.' },
    { from: 'persona', text: '우울한 감정을 느끼고 계시는군요. 언제부터 이런 감정이 시작되었나요?' }
  ]
};
 

function getTodakiReply(userMsg: string, persona: Persona | null) {
  if (!persona) return '먼저 대화할 페르소나를 선택해 주세요!';
  if (userMsg.includes('안녕')) return `${persona.name}입니다! 무엇이 궁금한가요?`;
  if (userMsg.includes('고마워')) return '저야말로 고마워요!';
  if (userMsg.includes('힘들어')) return '많이 힘들었겠어요. 어떤 점이 가장 힘들었나요?';
  return '조금 더 자세히 이야기해줄 수 있을까요?';
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'todaki', text: '안녕! 나는 토닥이야.\n너의 마음을 토닥토닥 해 줄게.\n\n오늘은 어떤 페르소나와 대화하고 싶어?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [showRecord, setShowRecord] = useState(false);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleRecord = () => {
    setShowRecord(!showRecord);
  };

  useEffect(() => {
    if (selectedPersona && listRef.current && messages.length > 0) {
      listRef.current.scrollToItem(messages.length - 1, 'end');
      setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container && container.scrollHeight > container.clientHeight) {
          // @ts-expect-error
          listRef.current.scrollTo(container.scrollTop + 30);
        }
      }, 0);
    }
  }, [messages, selectedPersona, streamingText]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [
      ...prev,
      { from: 'user', text: userMsg }
    ]);
    setInput('');
    setIsTyping(true);
    setStreamingText('');
    setTimeout(() => {
      const fullText = getTodakiReply(userMsg, selectedPersona);
      let i = 0;
      function typeChar() {
        setStreamingText(fullText.slice(0, i + 1));
        if (i < fullText.length - 1) {
          i++;
          setTimeout(typeChar, 28); // 타이핑 속도
        } else {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            selectedPersona
              ? { from: 'persona', text: fullText, personaName: selectedPersona.name, personaImg: selectedPersona.img }
              : { from: 'persona', text: fullText }
          ]);
          setStreamingText('');
        }
      }
      typeChar();
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };       

  // 음성 인식 시작/종료
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }
    if (isRecording) {
      recognitionRef.current && recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => {
      setIsRecording(false);
      alert('음성 인식에 실패했습니다.');
    };
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  // 페르소나 변경 버튼 클릭 시 모달 표시
  const handlePersonaBtnClick = () => {
    setShowPersonaModal(true);
  };
  // 모달에서 페르소나 선택 시 페르소나만 변경(대화 유지)
  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona);
    setShowPersonaModal(false);
  };

  // 페르소나 선택 시 초기 메시지 추가
  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setMessages([
      { from: 'persona', text: `${persona.name}입니다! 무엇이 궁금한가요?`, personaName: persona.name, personaImg: persona.img }
    ]);
  };

  // 기록 클릭 핸들러 추가
  const handleRecordClick = (record: string) => {
    const persona = record.includes('지원이') ? personaList[0] :
                   record.includes('여름씨') ? personaList[1] :
                   record.includes('서연쌤') ? personaList[2] : null;
    if (persona && recordMessages[record]) {
      setSelectedPersona(persona);
      setMessages(recordMessages[record].map(msg =>
        msg.from === 'persona'
          ? { ...msg, personaName: persona.name, personaImg: persona.img }
          : msg
      ));
      setShowRecord(false);
    }
  };

  // 가상 스크롤 메시지 렌더러
  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    // 마지막 메시지 아래에 streamingText가 있으면 typing 표시
    if (index === messages.length && isTyping && streamingText) {
      return (
        <div style={{ ...style }} className="msg-todaki">
          <div className="persona-avatar-block">
            <img src={selectedPersona ? selectedPersona.img : todakiImg} alt="토닥이" className="persona-avatar-img" />
          </div>
          <div className="msg-todaki-content">
            <div className="persona-avatar-name">{selectedPersona ? selectedPersona.name : '토닥이'}</div>
            <span className="persona-bubble" style={{whiteSpace: 'pre-line'}}>{streamingText}</span>
          </div>
        </div>
      );
    }
    const msg = messages[index];
    if (!msg) return null;
    if (!selectedPersona && index === 0) return null;
    if (msg.from === 'persona' || msg.from === 'todaki') {
      return (
        <div key={index} className="msg-todaki" style={{ ...style }}>
          <div className="persona-avatar-block">
            <img src={msg.personaImg || todakiImg} alt={msg.personaName || '토닥이'} className="persona-avatar-img" />
          </div>
          <div className="msg-todaki-content">
            <div className="persona-avatar-name">{msg.personaName || '토닥이'}</div>
            <span className="persona-bubble" style={{whiteSpace: 'pre-line'}}>{msg.text.replace(/\\n/g, '\n')}</span>
          </div>
        </div>
      );
    }
    // 사용자 메시지
    return (
      <div
        key={index}
        className="msg-user"
        style={{ ...style, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
      >
        <span style={{whiteSpace: 'pre-line'}}>{msg.text.replace(/\\n/g, '\n')}</span>
      </div>
    );
  };

  return (
    <div className="mainpage-root">
      <nav className="main-nav">
        <button className="menu-toggle-btn" onClick={toggleRecord}>
          ☰
        </button>
        <img src={logoImg} alt="토닥이 로고" className="main-logo" onClick={() => navigate('/main')} style={{cursor:'pointer'}} />
        <div className="main-menu">
          <span onClick={() => navigate('/main')} style={{cursor:'pointer'}}>채팅</span>
          <span onClick={() => navigate('/goals')} style={{cursor:'pointer'}}>목표</span>
          <span onClick={() => navigate('/analysis')} style={{cursor:'pointer'}}>분석</span>
          <span onClick={() => navigate('/calendar')} style={{cursor:'pointer'}}>캘린더</span>
          <span onClick={() => navigate('/test')} style={{cursor:'pointer'}}>심리검사</span>
        </div>
        <span className="profile-menu" style={{cursor:'pointer', marginLeft: 'auto', paddingRight: '20px'}} onClick={() => navigate('/profile')}>프로필</span>
      </nav>
      <div className="mainpage-content">
        <aside className={`record-section ${showRecord ? 'show' : ''}`}>
          <div className="record-title-row" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
            <div className="record-title">기록</div>
            <button
              className="record-add-btn"
              style={{
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
                fontSize: 22,
                fontWeight: 700,
                color: '#888',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 6
              }}
              title="새 채팅"
              onClick={() => {
                setSelectedPersona(null);
                setMessages([
                  { from: 'todaki', text: '안녕! 나는 토닥이야.\n너의 마음을 토닥토닥 해 줄게.\n\n오늘은 어떤 페르소나와 대화하고 싶어?' }
                ]);
                setShowRecord(false);
              }}
            >
              +
            </button>
          </div>
          <div className="record-list">
            {recordList.map((item, idx) => (
              <div 
                className="record-item" 
                key={idx}
                onClick={() => handleRecordClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
        <section className="chat-section">
          <div className="chat-box">
            {/* 페르소나 선택 전 */}
            {!selectedPersona && (
              <>
                <div className="chat-header">
                  <img src={todakiImg} alt="토닥이" className="chat-todaki-img" />
                  <div>
                    <div className="persona-avatar-name">토닥이</div>
                    <div className="chat-todaki-msg" style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
                      <div style={{marginTop: 4}}>
                        {`안녕! 나는 토닥이야.\n너의 마음을 토닥토닥 해 줄게.\n\n오늘은 어떤 페르소나와 대화하고 싶어?`.replace(/\\n/g, '\n')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="persona-list">
                  {personaList.map((p, idx) => (
                    <div className="persona-card" key={idx} onClick={() => handlePersonaSelect(p)} style={{cursor:'pointer'}}>
                      <img src={p.img} alt={p.name} className="persona-img" />
                      <div className="persona-name">{p.name}</div>
                      <div className="persona-desc">{p.desc}</div>
                      <div className="persona-detail">{p.detail.split('\\n').map((line, i) => <div key={i}>{line}</div>)}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* 페르소나 선택 후 대화 (가상 스크롤) */}
            {selectedPersona && (
              <>
                <div
                  ref={scrollContainerRef}
                  className="chat-messages custom-scrollbar"
                  style={{flex: 1, overflowY: 'auto', marginBottom: 18, height: 400, paddingRight: 2}}
                >
                  <List
                    ref={listRef}
                    height={730}
                    itemCount={messages.length + (isTyping && streamingText ? 1 : 0)}
                    itemSize={56}
                    width={'100%'}
                  >
                    {renderRow}
                  </List>
                </div>
                <div className="chat-input-row">
                  <button
                    className="persona-btn"
                    title="페르소나 변경"
                    style={{marginRight:8,background:'none',border:'none',cursor:'pointer',fontSize:22}}
                    onClick={handlePersonaBtnClick}
                    disabled={isTyping}
                  >
                    <span role="img" aria-label="persona">👤</span>
                  </button>
                  <button
                    className="record-btn"
                    title={isRecording ? '녹음 중지' : '음성 입력'}
                    style={{marginRight:8,background:'none',border:'none',cursor:'pointer',fontSize:22,color:isRecording?'#4A90E2':'#888'}}
                    onClick={handleMicClick}
                    disabled={isTyping}
                  >
                    <span role="img" aria-label="mic">🎤</span>
                  </button>
                  <input
                    className="chat-input"
                    placeholder={`${selectedPersona.name}에게 털어놔 봐!`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                  />
                  <button className="mic-btn" onClick={handleSend} disabled={isTyping}>전송</button>
                </div>
                {/* 페르소나 변경 모달 */}
                {showPersonaModal && (
                  <div className="persona-modal-bg" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.18)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="persona-modal" style={{background:'#fff',borderRadius:18,padding:32,boxShadow:'0 2px 16px rgba(0,0,0,0.13)',display:'flex',gap:24}}>
                      {personaList.map((p, idx) => (
                        <div key={idx} className="persona-card" onClick={() => handlePersonaChange(p)} style={{cursor:'pointer',minWidth:160,alignItems:'center',display:'flex',flexDirection:'column'}}>
                          <img src={p.img} alt={p.name} className="persona-img" />
                          <div className="persona-name">{p.name}</div>
                          <div className="persona-desc">{p.desc}</div>
                          <div className="persona-detail">{p.detail.split('\\n').map((line, i) => <div key={i}>{line}</div>)}</div>
                        </div>
                      ))}
                      <button onClick={()=>setShowPersonaModal(false)} style={{marginLeft:24,background:'#eee',border:'none',borderRadius:8,padding:'8px 18px',cursor:'pointer',fontWeight:500}}>닫기</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage; 