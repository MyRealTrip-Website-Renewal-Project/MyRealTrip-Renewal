import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FiUser, FiMail, FiLock, FiSettings } from 'react-icons/fi';
import Modal from './Modal';
import { Input, Textarea, Select } from '../ui';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '접근성과 사용성을 고려한 고급 모달 컴포넌트입니다. 포커스 트랩, 키보드 네비게이션, 애니메이션을 지원합니다.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '모달 크기'
    },
    type: {
      control: 'select',
      options: ['default', 'alert', 'confirm', 'success'],
      description: '모달 타입'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기'
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시'
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태'
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 시 호출'
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 시 호출'
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 시 호출'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 기본 모달
export const Default: Story = {
  args: {
    isOpen: true,
    title: '기본 모달',
    subtitle: '모달의 기본적인 사용 예시입니다.',
    children: (
      <div>
        <p>이것은 기본 모달의 내용입니다.</p>
        <p>모달은 사용자에게 중요한 정보를 표시하거나 작업을 수행할 때 사용됩니다.</p>
      </div>
    )
  }
};

// 다양한 크기
export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setOpenModal('sm')}>Small Modal</button>
          <button onClick={() => setOpenModal('md')}>Medium Modal</button>
          <button onClick={() => setOpenModal('lg')}>Large Modal</button>
          <button onClick={() => setOpenModal('xl')}>Extra Large Modal</button>
          <button onClick={() => setOpenModal('full')}>Full Screen Modal</button>
        </div>

        {openModal && (
          <Modal
            isOpen={true}
            onClose={() => setOpenModal(null)}
            title={`${openModal.toUpperCase()} 모달`}
            size={openModal}
          >
            <p>이것은 {openModal} 크기의 모달입니다.</p>
            <p>다양한 크기의 모달을 사용하여 콘텐츠에 맞는 적절한 공간을 제공할 수 있습니다.</p>
          </Modal>
        )}
      </div>
    );
  }
};

// 알림 모달
export const Alert: Story = {
  args: {
    isOpen: true,
    type: 'alert',
    title: '주의',
    children: (
      <div>
        <p>이 작업은 되돌릴 수 없습니다.</p>
        <p>정말로 계속하시겠습니까?</p>
      </div>
    )
  }
};

// 확인 모달
export const Confirm: Story = {
  args: {
    isOpen: true,
    type: 'confirm',
    title: '삭제 확인',
    children: (
      <div>
        <p>선택한 항목을 삭제하시겠습니까?</p>
        <p>이 작업은 되돌릴 수 없습니다.</p>
      </div>
    ),
    confirmText: '삭제',
    cancelText: '취소'
  }
};

// 성공 모달
export const Success: Story = {
  args: {
    isOpen: true,
    type: 'success',
    title: '성공',
    children: (
      <div>
        <p>작업이 성공적으로 완료되었습니다.</p>
        <p>변경사항이 저장되었습니다.</p>
      </div>
    )
  }
};

// 폼 모달
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: '',
      description: ''
    });

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => setIsOpen(true)}>사용자 추가</button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="새 사용자 추가"
          size="lg"
          buttons={[
            {
              label: '취소',
              variant: 'secondary',
              onClick: () => setIsOpen(false)
            },
            {
              label: '저장',
              variant: 'primary',
              onClick: handleSubmit
            }
          ]}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                         <Input
               label="이름"
               placeholder="사용자 이름을 입력하세요"
               value={formData.name}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
               icon={FiUser}
             />
             
             <Input
               label="이메일"
               type="email"
               placeholder="이메일을 입력하세요"
               value={formData.email}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
               icon={FiMail}
             />
             
             <Select
               label="역할"
               options={[
                 { label: '관리자', value: 'admin' },
                 { label: '편집자', value: 'editor' },
                 { label: '뷰어', value: 'viewer' }
               ]}
               value={formData.role}
               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, role: e.target.value })}
             />
             
             <Textarea
               label="설명"
               placeholder="사용자에 대한 설명을 입력하세요"
               rows={3}
               value={formData.description}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
             />
          </div>
        </Modal>
      </div>
    );
  }
};

// 커스텀 버튼
export const CustomButtons: Story = {
  args: {
    isOpen: true,
    title: '커스텀 버튼',
    children: (
      <div>
        <p>커스텀 버튼을 사용한 모달 예시입니다.</p>
        <p>다양한 스타일과 동작을 가진 버튼을 설정할 수 있습니다.</p>
      </div>
    ),
    buttons: [
      {
        label: '저장',
        variant: 'primary',
        onClick: () => console.log('저장됨')
      },
      {
        label: '임시저장',
        variant: 'secondary',
        onClick: () => console.log('임시저장됨')
      },
      {
        label: '삭제',
        variant: 'danger',
        onClick: () => console.log('삭제됨')
      }
    ]
  }
};

// 로딩 상태
export const Loading: Story = {
  args: {
    isOpen: true,
    title: '로딩 중',
    loading: true,
    children: (
      <div>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    )
  }
};

// 에러 상태
export const WithError: Story = {
  args: {
    isOpen: true,
    title: '오류 발생',
    error: '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.',
    children: (
      <div>
        <p>오류가 발생한 모달의 예시입니다.</p>
      </div>
    )
  }
};

// 푸터 정렬
export const FooterAlignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'space-between'>('right');

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>푸터 정렬: </label>
          <select value={alignment} onChange={(e) => setAlignment(e.target.value as any)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="space-between">Space Between</option>
          </select>
        </div>

                 <button onClick={() => {}}>모달 열기</button>

        <Modal
          isOpen={true}
          onClose={() => {}}
          title="푸터 정렬 테스트"
          footerAlign={alignment}
          buttons={[
            { label: '취소', variant: 'secondary' },
            { label: '저장', variant: 'primary' }
          ]}
        >
          <p>푸터의 정렬 방식을 테스트할 수 있습니다.</p>
        </Modal>
      </div>
    );
  }
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<'default' | 'alert' | 'confirm' | 'success'>('default');

    const openModal = (type: typeof modalType) => {
      setModalType(type);
      setIsOpen(true);
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button onClick={() => openModal('default')}>기본 모달</button>
          <button onClick={() => openModal('alert')}>알림 모달</button>
          <button onClick={() => openModal('confirm')}>확인 모달</button>
          <button onClick={() => openModal('success')}>성공 모달</button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type={modalType}
          title={
            modalType === 'default' ? '기본 모달' :
            modalType === 'alert' ? '주의' :
            modalType === 'confirm' ? '확인' :
            '성공'
          }
          onConfirm={() => {
            console.log('확인됨');
            setIsOpen(false);
          }}
          onCancel={() => {
            console.log('취소됨');
            setIsOpen(false);
          }}
        >
          <div>
            {modalType === 'default' && (
              <p>기본 모달의 내용입니다. 다양한 정보를 표시할 수 있습니다.</p>
            )}
            {modalType === 'alert' && (
              <p>주의가 필요한 작업입니다. 신중하게 진행해주세요.</p>
            )}
            {modalType === 'confirm' && (
              <p>이 작업을 진행하시겠습니까? 되돌릴 수 없습니다.</p>
            )}
            {modalType === 'success' && (
              <p>작업이 성공적으로 완료되었습니다!</p>
            )}
          </div>
        </Modal>
      </div>
    );
  }
};

// 접근성 테스트
export const Accessibility: Story = {
  args: {
    isOpen: true,
    title: '접근성 테스트',
    subtitle: '키보드 네비게이션과 스크린 리더를 테스트해보세요.',
    children: (
      <div>
        <p>이 모달은 다음과 같은 접근성 기능을 제공합니다:</p>
        <ul>
          <li>ESC 키로 모달 닫기</li>
          <li>포커스 트랩 (Tab 키로 모달 내부 순환)</li>
          <li>ARIA 라벨 및 역할</li>
          <li>스크린 리더 호환성</li>
        </ul>
        <p>Tab 키를 눌러 버튼들 사이를 이동해보세요.</p>
      </div>
    ),
    buttons: [
      { label: '첫 번째 버튼', variant: 'primary' },
      { label: '두 번째 버튼', variant: 'secondary' },
      { label: '세 번째 버튼', variant: 'ghost' }
    ]
  }
}; 