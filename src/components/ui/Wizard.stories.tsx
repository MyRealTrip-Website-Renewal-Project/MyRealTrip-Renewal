import type { Meta, StoryObj } from '@storybook/react';
import { Wizard, WizardStep } from './Wizard';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Button } from './Button';

const meta: Meta<typeof Wizard> = {
  title: 'UI/Wizard',
  component: Wizard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '위저드 컴포넌트입니다. 단계별 프로세스를 안내하며 유효성 검사와 상태 관리를 지원합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '위저드 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '위저드 테마'
    },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'compact'],
      description: '위저드 레이아웃'
    },
    animated: {
      control: 'boolean',
      description: '애니메이션 활성화 여부'
    },
    stepClickable: {
      control: 'boolean',
      description: '스텝 클릭 가능 여부'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', width: '100%', maxWidth: '1000px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 스텝들
const sampleSteps: WizardStep[] = [
  {
    key: 'step1',
    title: '기본 정보',
    description: '사용자 기본 정보를 입력하세요',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>기본 정보 입력</h3>
        <p>계정 생성을 위한 기본 정보를 입력해주세요.</p>
        <Input label="이름" placeholder="이름을 입력하세요" />
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />
        <Input label="전화번호" placeholder="전화번호를 입력하세요" />
      </div>
    )
  },
  {
    key: 'step2',
    title: '계정 설정',
    description: '계정 설정을 완료하세요',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>계정 설정</h3>
        <p>보안을 위한 계정 설정을 완료해주세요.</p>
        <Input label="사용자명" placeholder="사용자명을 입력하세요" />
        <Input label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" />
        <Input label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력하세요" />
        <Select
          label="보안 질문"
          options={[
            { value: 'pet', label: '첫 번째 반려동물의 이름은?' },
            { value: 'city', label: '태어난 도시는?' },
            { value: 'school', label: '졸업한 초등학교는?' }
          ]}
        />
        <Input label="보안 답변" placeholder="보안 질문에 대한 답변을 입력하세요" />
      </div>
    )
  },
  {
    key: 'step3',
    title: '약관 동의',
    description: '이용약관에 동의하세요',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>이용약관 동의</h3>
        <p>서비스 이용을 위한 약관에 동의해주세요.</p>
        <Checkbox label="서비스 이용약관에 동의합니다" />
        <Checkbox label="개인정보 처리방침에 동의합니다" />
        <Checkbox label="마케팅 정보 수신에 동의합니다" />
        <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <h4>서비스 이용약관</h4>
          <p style={{ fontSize: '12px', lineHeight: '1.5' }}>
            본 약관은 서비스 이용과 관련된 권리와 의무를 규정합니다...
          </p>
        </div>
      </div>
    )
  },
  {
    key: 'step4',
    title: '완료',
    description: '계정 생성이 완료되었습니다',
    content: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>🎉 계정 생성 완료!</h3>
        <p>축하합니다! 계정이 성공적으로 생성되었습니다.</p>
        <p>이제 서비스를 이용하실 수 있습니다.</p>
        <Button type="primary" style={{ marginTop: '1rem' }}>
          서비스 시작하기
        </Button>
      </div>
    )
  }
];

// 유효성 검사가 있는 스텝들
const stepsWithValidation: WizardStep[] = [
  {
    key: 'step1',
    title: '이름 입력',
    description: '이름을 입력하세요',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>이름 입력</h3>
        <Input label="이름" placeholder="이름을 입력하세요" />
        <Input label="성" placeholder="성을 입력하세요" />
      </div>
    ),
    validate: () => {
      // 실제로는 입력값을 확인해야 함
      return Math.random() > 0.3; // 70% 확률로 성공
    }
  },
  {
    key: 'step2',
    title: '이메일 확인',
    description: '이메일을 입력하세요',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>이메일 입력</h3>
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />
        <Input label="이메일 확인" type="email" placeholder="이메일을 다시 입력하세요" />
      </div>
    ),
    validate: () => {
      return Math.random() > 0.2; // 80% 확률로 성공
    }
  },
  {
    key: 'step3',
    title: '완료',
    description: '모든 단계가 완료되었습니다',
    content: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>✅ 완료!</h3>
        <p>모든 단계가 성공적으로 완료되었습니다.</p>
      </div>
    )
  }
];

// 기본 위저드
export const Default: Story = {
  args: {
    title: '계정 생성 마법사',
    steps: sampleSteps
  }
};

// 유효성 검사가 있는 위저드
export const WithValidation: Story = {
  args: {
    title: '유효성 검사 위저드',
    steps: stepsWithValidation,
    onFinish: () => alert('위저드가 완료되었습니다!'),
    onCancel: () => alert('위저드가 취소되었습니다.')
  }
};

// 크기별 위저드
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Wizard
          size="sm"
          title="작은 위저드"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Wizard
          title="중간 위저드"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Wizard
          size="lg"
          title="큰 위저드"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 테마별 위저드
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Wizard
          title="기본 테마"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Wizard
          theme="primary"
          title="주요 테마"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Wizard
          theme="success"
          title="성공 테마"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Wizard
          theme="warning"
          title="경고 테마"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Wizard
          theme="error"
          title="오류 테마"
          steps={sampleSteps.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 레이아웃별 위저드
export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Horizontal Layout (Default)</h3>
        <Wizard
          layout="horizontal"
          title="수평 레이아웃"
          steps={sampleSteps.slice(0, 3)}
        />
      </div>
      <div>
        <h3>Vertical Layout</h3>
        <Wizard
          layout="vertical"
          title="수직 레이아웃"
          steps={sampleSteps.slice(0, 3)}
        />
      </div>
      <div>
        <h3>Compact Layout</h3>
        <Wizard
          layout="compact"
          title="컴팩트 레이아웃"
          steps={sampleSteps.slice(0, 3)}
        />
      </div>
    </div>
  )
};

// 애니메이션이 있는 위저드
export const Animated: Story = {
  args: {
    title: '애니메이션 위저드',
    steps: sampleSteps,
    animated: true
  }
};

// 스텝 클릭이 불가능한 위저드
export const NonClickableSteps: Story = {
  args: {
    title: '순차 진행 위저드',
    steps: sampleSteps,
    stepClickable: false
  }
};

// 비활성화된 스텝이 있는 위저드
export const WithDisabledSteps: Story = {
  args: {
    title: '비활성 스텝 위저드',
    steps: [
      {
        key: 'step1',
        title: '활성 스텝',
        description: '이 스텝은 활성입니다',
        content: <div>활성 스텝 내용</div>
      },
      {
        key: 'step2',
        title: '비활성 스텝',
        description: '이 스텝은 비활성입니다',
        content: <div>비활성 스텝 내용</div>,
        disabled: true
      },
      {
        key: 'step3',
        title: '활성 스텝',
        description: '이 스텝은 활성입니다',
        content: <div>활성 스텝 내용</div>
      }
    ]
  }
};

// 커스텀 버튼 텍스트가 있는 위저드
export const CustomButtonText: Story = {
  args: {
    title: '커스텀 버튼 위저드',
    steps: sampleSteps.slice(0, 3),
    nextText: '계속하기',
    prevText: '돌아가기',
    finishText: '완료하기',
    cancelText: '중단하기'
  }
};

// 복잡한 위저드 (모든 기능 포함)
export const Complex: Story = {
  args: {
    title: '복잡한 위저드',
    steps: [
      {
        key: 'personal',
        title: '개인정보',
        description: '개인 정보를 입력하세요',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>개인 정보 입력</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="이름" placeholder="이름" />
              <Input label="성" placeholder="성" />
            </div>
            <Input label="생년월일" type="date" />
            <Select
              label="성별"
              options={[
                { value: 'male', label: '남성' },
                { value: 'female', label: '여성' },
                { value: 'other', label: '기타' }
              ]}
            />
            <Input label="전화번호" placeholder="010-1234-5678" />
          </div>
        ),
        validate: () => {
          // 실제로는 입력값 검증
          return true;
        }
      },
      {
        key: 'address',
        title: '주소정보',
        description: '주소 정보를 입력하세요',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>주소 정보 입력</h3>
            <Input label="우편번호" placeholder="우편번호" />
            <Input label="기본주소" placeholder="기본주소" />
            <Input label="상세주소" placeholder="상세주소" />
            <Select
              label="주소 타입"
              options={[
                { value: 'home', label: '집' },
                { value: 'work', label: '직장' },
                { value: 'other', label: '기타' }
              ]}
            />
          </div>
        ),
        validate: () => {
          return true;
        }
      },
      {
        key: 'preferences',
        title: '선호사항',
        description: '선호사항을 설정하세요',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>선호사항 설정</h3>
            <Checkbox label="뉴스레터 구독" />
            <Checkbox label="마케팅 정보 수신" />
            <Checkbox label="SMS 알림 수신" />
            <Select
              label="선호 언어"
              options={[
                { value: 'ko', label: '한국어' },
                { value: 'en', label: 'English' },
                { value: 'ja', label: '日本語' }
              ]}
            />
            <Select
              label="시간대"
              options={[
                { value: 'kst', label: '한국 표준시 (KST)' },
                { value: 'pst', label: '태평양 표준시 (PST)' },
                { value: 'est', label: '동부 표준시 (EST)' }
              ]}
            />
          </div>
        )
      },
      {
        key: 'verification',
        title: '인증',
        description: '이메일 인증을 완료하세요',
        content: (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>이메일 인증</h3>
            <p>입력하신 이메일로 인증 코드를 발송했습니다.</p>
            <Input label="인증 코드" placeholder="6자리 코드를 입력하세요" />
            <Button type="primary" style={{ marginTop: '1rem' }}>
              인증 코드 재발송
            </Button>
          </div>
        ),
        validate: () => {
          return Math.random() > 0.5; // 50% 확률로 성공
        }
      },
      {
        key: 'completion',
        title: '완료',
        description: '모든 설정이 완료되었습니다',
        content: (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>🎉 가입 완료!</h3>
            <p>축하합니다! 모든 설정이 완료되었습니다.</p>
            <p>이제 서비스를 이용하실 수 있습니다.</p>
            <div style={{ marginTop: '2rem' }}>
              <Button type="primary" style={{ marginRight: '1rem' }}>
                대시보드로 이동
              </Button>
              <Button>
                프로필 설정
              </Button>
            </div>
          </div>
        )
      }
    ],
    animated: true,
    stepClickable: true,
    onStepChange: (step) => console.log('스텝 변경:', step),
    onFinish: () => alert('가입이 완료되었습니다!'),
    onCancel: () => {
      if (confirm('정말로 가입을 취소하시겠습니까?')) {
        alert('가입이 취소되었습니다.');
      }
    }
  }
}; 