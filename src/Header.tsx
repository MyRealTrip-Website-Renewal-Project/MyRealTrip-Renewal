import React from 'react';
import CI from './assets/img/CI.svg';

export default function Header() {
  const [keyword, setKeyword] = React.useState('');

  const handleSearch = () => {
    if (keyword.trim()) {
      alert(`'${keyword}'(으)로 검색합니다!`);
    } else {
      alert('여행지를 입력해 주세요.');
    }
  };

  return (
    <header className="header sticky-header">
      <div className="header-inner">
        <div className="header-left">
          <img src={CI} alt="Myrealtrip CI" className="header-logo" />
          <div className="header-searchbar">
            <input
              type="text"
              placeholder='"휘닉스파크" 역대급 특가 오픈'
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-icon-btn" onClick={handleSearch} aria-label="검색">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
                <circle cx="9" cy="9" r="7" stroke="#bdbdbd" strokeWidth="2"/>
                <path d="M15 15L18 18" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="header-right">
          <span className="partner-login">파트너 로그인</span>
          <button className="login-btn">로그인 및 회원가입</button>
        </div>
      </div>
    </header>
  );
}
