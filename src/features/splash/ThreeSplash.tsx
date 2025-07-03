import React, { useEffect, useState } from 'react';
import CI from '../../assets/img/CI.svg';

export default function ThreeSplash({ onFinish }: { onFinish?: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.7s',
      }}
    >
      <img
        src={CI}
        alt="Myrealtrip"
        style={{
          width: 120,
          height: 48,
          marginBottom: 32,
          opacity: show ? 1 : 0,
          transform: `scale(${show ? 1 : 0.8})`,
          transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          filter: 'drop-shadow(0 2px 16px #eee8)',
        }}
      />
      <div
        style={{
          fontSize: 22,
          color: '#222',
          fontWeight: 600,
          fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
          letterSpacing: '-0.01em',
          opacity: show ? 1 : 0,
          transform: `translateY(${show ? 0 : 16}px)`,
          transition: 'opacity 0.7s 0.1s cubic-bezier(0.22,1,0.36,1), transform 0.7s 0.1s cubic-bezier(0.22,1,0.36,1)',
          textAlign: 'center',
        }}
      >
        진짜 나다운 여행 - 마이리얼트립
      </div>
    </div>
  );
} 