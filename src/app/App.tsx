import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import './App.scss';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyRealTrip Renewal</h1>
        <p>UI 컴포넌트 라이브러리 테스트</p>
      </header>
      
      <main className="app-main">
        <section className="component-section">
          <h2>기본 컴포넌트 테스트</h2>
          
          <div className="component-demo">
            <h3>Button 컴포넌트</h3>
            <div className="demo-row">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </div>

          <div className="component-demo">
            <h3>Input 컴포넌트</h3>
            <div className="demo-row">
              <Input placeholder="텍스트를 입력하세요" />
              <Input type="email" placeholder="이메일을 입력하세요" />
            </div>
          </div>

          <div className="component-demo">
            <h3>Modal 컴포넌트</h3>
            <Button onClick={() => setIsModalOpen(true)}>
              모달 열기
            </Button>
          </div>

          <div className="component-demo">
            <h3>Toast 컴포넌트</h3>
            <Button onClick={() => setShowToast(true)}>
              토스트 표시
            </Button>
          </div>
        </section>
      </main>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="테스트 모달"
      >
        <p>이것은 테스트용 모달입니다.</p>
        <p>SCSS 모듈과 타입 선언이 정상적으로 작동하는지 확인할 수 있습니다.</p>
      </Modal>

      {showToast && (
        <Toast
          message="토스트 메시지가 표시됩니다!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App; 