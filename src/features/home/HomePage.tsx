import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainVisual from '@features/mainVisual/MainVisual';

export default React.memo(function Home() {
  return (
    <>
      <Helmet>
        <title>진짜 나다운 여행 - 마이리얼트립</title>
        <meta name="description" content="진짜 나다운 여행, 마이리얼트립에서 특별한 여행을 경험하세요" />
        <meta property="og:title" content="진짜 나다운 여행 - 마이리얼트립" />
        <meta property="og:description" content="진짜 나다운 여행, 마이리얼트립에서 특별한 여행을 경험하세요" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main>
        <MainVisual 
          backgroundImage="/src/assets/img/76924789273a48aadae2ee510514eea924c63067.webp"
        />
      </main>
    </>
  );
}); 