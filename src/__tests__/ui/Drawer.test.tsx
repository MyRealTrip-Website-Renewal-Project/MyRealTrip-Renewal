import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../../components/ui/Drawer';

// React Portal 모킹
const mockPortal = (children: React.ReactNode) => children;
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((children) => mockPortal(children)),
}));

describe('Drawer', () => {
  const defaultProps = {
    open: false,
    onClose: jest.fn(),
    children: <div>드로어 컨텐츠</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // body 스타일 초기화
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // body 스타일 복원
    document.body.style.overflow = '';
  });

  it('기본 렌더링이 올바르게 작동한다', () => {
    render(<Drawer {...defaultProps} open={true} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('드로어 컨텐츠')).toBeInTheDocument();
  });

  it('닫혀있을 때는 렌더링되지 않는다', () => {
    render(<Drawer {...defaultProps} open={false} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('드로어 컨텐츠')).not.toBeInTheDocument();
  });

  it('제목이 올바르게 표시된다', () => {
    render(<Drawer {...defaultProps} open={true} title="테스트 드로어" />);
    
    expect(screen.getByText('테스트 드로어')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'drawer-title');
  });

  it('닫기 버튼이 올바르게 작동한다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} showCloseButton={true} />);
    
    const closeButton = screen.getByLabelText('드로어 닫기');
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('닫기 버튼이 숨겨질 수 있다', () => {
    render(<Drawer {...defaultProps} open={true} showCloseButton={false} />);
    
    expect(screen.queryByLabelText('드로어 닫기')).not.toBeInTheDocument();
  });

  it('오버레이 클릭으로 닫힌다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} closeOnOverlayClick={true} />);
    
    const overlay = screen.getByRole('dialog').parentElement;
    await user.click(overlay!);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('오버레이 클릭이 비활성화될 수 있다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} closeOnOverlayClick={false} />);
    
    const overlay = screen.getByRole('dialog').parentElement;
    await user.click(overlay!);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('ESC 키로 닫힌다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} closeOnEscape={true} />);
    
    await user.keyboard('{Escape}');
    
    expect(onClose).toHaveBeenCalled();
  });

  it('ESC 키 닫기가 비활성화될 수 있다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} closeOnEscape={false} />);
    
    await user.keyboard('{Escape}');
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('오버레이가 숨겨질 수 있다', () => {
    render(<Drawer {...defaultProps} open={true} showOverlay={false} />);
    
    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay).toHaveClass('overlay');
  });

  it('다양한 위치로 렌더링된다', () => {
    const { rerender } = render(<Drawer {...defaultProps} open={true} position="left" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--left');
    
    rerender(<Drawer {...defaultProps} open={true} position="right" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--right');
    
    rerender(<Drawer {...defaultProps} open={true} position="top" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--top');
    
    rerender(<Drawer {...defaultProps} open={true} position="bottom" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--bottom');
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(<Drawer {...defaultProps} open={true} size="sm" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--sm');
    
    rerender(<Drawer {...defaultProps} open={true} size="md" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--md');
    
    rerender(<Drawer {...defaultProps} open={true} size="lg" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--lg');
    
    rerender(<Drawer {...defaultProps} open={true} size="xl" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--xl');
    
    rerender(<Drawer {...defaultProps} open={true} size="full" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--full');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(<Drawer {...defaultProps} open={true} variant="default" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--default');
    
    rerender(<Drawer {...defaultProps} open={true} variant="outlined" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--outlined');
    
    rerender(<Drawer {...defaultProps} open={true} variant="filled" />);
    expect(screen.getByRole('dialog')).toHaveClass('drawer--filled');
  });

  it('커스텀 z-index가 적용된다', () => {
    render(<Drawer {...defaultProps} open={true} zIndex={2000} />);
    
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveStyle({ zIndex: 2000 });
  });

  it('커스텀 오버레이 투명도가 적용된다', () => {
    render(<Drawer {...defaultProps} open={true} overlayOpacity={0.8} />);
    
    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.8)' });
  });

  it('드로어 클릭 시 이벤트 버블링이 방지된다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Drawer {...defaultProps} open={true} onClose={onClose} closeOnOverlayClick={true} />);
    
    const drawer = screen.getByRole('dialog');
    await user.click(drawer);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(<Drawer {...defaultProps} open={true} title="테스트 드로어" aria-label="커스텀 라벨" />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'drawer-title');
    expect(dialog).toHaveAttribute('aria-label', '커스텀 라벨');
  });

  it('제목이 없을 때 aria-labelledby가 설정되지 않는다', () => {
    render(<Drawer {...defaultProps} open={true} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('body 스크롤이 방지된다', () => {
    render(<Drawer {...defaultProps} open={true} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('드로어가 닫힐 때 body 스크롤이 복원된다', async () => {
    const { rerender } = render(<Drawer {...defaultProps} open={true} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Drawer {...defaultProps} open={false} />);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('포커스 트랩이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <button>이전 버튼</button>
        <Drawer {...defaultProps} open={true}>
          <button>첫 번째 버튼</button>
          <button>두 번째 버튼</button>
          <button>세 번째 버튼</button>
        </Drawer>
      </div>
    );
    
    const drawer = screen.getByRole('dialog');
    const firstButton = screen.getByText('첫 번째 버튼');
    const lastButton = screen.getByText('세 번째 버튼');
    
    // 첫 번째 버튼에 포커스
    firstButton.focus();
    
    // Tab 키로 마지막 버튼까지 이동
    await user.tab();
    await user.tab();
    
    // 마지막 버튼에서 Tab 키를 누르면 첫 번째 버튼으로 돌아가야 함
    await user.tab();
    expect(document.activeElement).toBe(firstButton);
    
    // Shift+Tab으로 이전 버튼으로 이동
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastButton);
  });

  it('이전 포커스로 복원된다', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <button>이전 버튼</button>
        <Drawer {...defaultProps} open={true} onClose={jest.fn()} />
      </div>
    );
    
    const previousButton = screen.getByText('이전 버튼');
    previousButton.focus();
    
    // 드로어 열기
    const drawer = screen.getByRole('dialog');
    drawer.focus();
    
    // 드로어 닫기
    const closeButton = screen.getByLabelText('드로어 닫기');
    await user.click(closeButton);
    
    // 이전 포커스로 복원되어야 함
    await waitFor(() => {
      expect(document.activeElement).toBe(previousButton);
    });
  });

  it('긴 컨텐츠가 스크롤 가능하다', () => {
    const longContent = (
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{ height: '100px', background: 'var(--color-gray-100)', margin: '10px 0' }}>
            섹션 {i + 1}
          </div>
        ))}
      </div>
    );
    
    render(<Drawer {...defaultProps} open={true} children={longContent} />);
    
    const content = screen.getByText('섹션 1').closest('.content');
    expect(content).toHaveStyle({ overflowY: 'auto' });
  });

  it('커스텀 클래스명이 적용된다', () => {
    render(<Drawer {...defaultProps} open={true} className="custom-drawer" />);
    
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('custom-drawer');
  });

  it('커스텀 스타일이 적용된다', () => {
    const customStyle = { backgroundColor: 'red' };
    
    render(<Drawer {...defaultProps} open={true} style={customStyle} />);
    
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveStyle({ backgroundColor: 'red' });
  });

  it('헤더가 없을 때도 올바르게 렌더링된다', () => {
    render(<Drawer {...defaultProps} open={true} showCloseButton={false} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('드로어 컨텐츠')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('여러 드로어가 동시에 열릴 수 있다', () => {
    render(
      <div>
        <Drawer {...defaultProps} open={true} title="첫 번째 드로어" />
        <Drawer {...defaultProps} open={true} title="두 번째 드로어" />
      </div>
    );
    
    expect(screen.getByText('첫 번째 드로어')).toBeInTheDocument();
    expect(screen.getByText('두 번째 드로어')).toBeInTheDocument();
  });
}); 