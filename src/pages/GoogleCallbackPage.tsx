import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('accessToken');
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);

      // 심리검사 데이터 조회 API 호출
      fetch('https://test-sso.online/auth/test', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(res => {
          if (res.status === 404) {
            // 심리검사 데이터 없음
            navigate('/initial');
          } else if (res.ok) {
            // 심리검사 데이터 있음
            navigate('/main');
          } else {
            alert('로그인 후 데이터 확인에 실패했습니다.');
            navigate('/');
          }
        })
        .catch(() => {
          alert('서버 통신 오류');
          navigate('/');
        });
    } else {
      alert('구글 로그인 실패');
      navigate('/');
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default GoogleCallbackPage; 