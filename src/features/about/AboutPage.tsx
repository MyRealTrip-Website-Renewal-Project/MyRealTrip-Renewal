import React from 'react';
import { Helmet } from 'react-helmet-async';

export default React.memo(function About() {
  return (
    <>
      <Helmet>
        <title>회사 소개 - 진짜 나다운 여행 - 마이리얼트립</title>
        <meta name="description" content="마이리얼트립 회사 소개 및 서비스 안내" />
        <meta property="og:title" content="회사 소개 - 진짜 나다운 여행 - 마이리얼트립" />
        <meta property="og:description" content="마이리얼트립 회사 소개 및 서비스 안내" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main style={{ padding: '32px', textAlign: 'center' }}>
        <h1>About</h1>
        <p>Myrealtrip 클론 프로젝트입니다.</p>
      </main>
    </>
  );
}); 