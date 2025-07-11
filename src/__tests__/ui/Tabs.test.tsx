import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabItem } from '../../components/ui/Tabs';

const sampleItems: TabItem[] = [
  {
    key: 'tab1',
    label: '첫 번째 탭',
    icon: '📄',
    content: <div data-testid="content-1">첫 번째 탭 내용</div>,
  },
  {
    key: 'tab2',
    label: '두 번째 탭',
    icon: '📊',
    content: <div data-testid="content-2">두 번째 탭 내용</div>,
  },
  {
    key: 'tab3',
    label: '세 번째 탭',
    icon: '⚙️',
    content: <div data-testid="content-3">세 번째 탭 내용</div>,
  },
  {
    key: 'tab4',
    label: '비활성 탭',
    icon: '🚫',
    disabled: true,
    content: <div data-testid="content-4">비활성 탭 내용</div>,
  },
];

const closableItems: TabItem[] = [
  {
    key: 'tab1',
    label: '닫을 수 있는 탭 1',
    icon: '📄',
    closable: true,
    content: <div>첫 번째 탭 내용</div>,
  },
  {
    key: 'tab2',
    label: '닫을 수 있는 탭 2',
    icon: '📊',
    closable: true,
    content: <div>두 번째 탭 내용</div>,
  },
  {
    key: 'tab3',
    label: '닫을 수 없는 탭',
    icon: '🔒',
    closable: false,
    content: <div>이 탭은 닫을 수 없습니다</div>,
  },
];

describe('Tabs', () => {
  it('기본 렌더링이 올바르게 작동한다', () => {
    render(<Tabs items={sampleItems} />);
    
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByText('첫 번째 탭')).toBeInTheDocument();
    expect(screen.getByText('두 번째 탭')).toBeInTheDocument();
    expect(screen.getByText('세 번째 탭')).toBeInTheDocument();
    expect(screen.getByText('비활성 탭')).toBeInTheDocument();
  });

  it('기본적으로 첫 번째 탭이 활성화된다', () => {
    render(<Tabs items={sampleItems} />);
    
    const firstTab = screen.getByText('첫 번째 탭').closest('button');
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('content-1')).toBeInTheDocument();
    expect(screen.queryByTestId('content-2')).not.toBeInTheDocument();
  });

  it('탭 클릭으로 탭이 변경된다', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} onTabChange={onTabChange} />);
    
    // 두 번째 탭 클릭
    const secondTab = screen.getByText('두 번째 탭');
    await user.click(secondTab);
    
    expect(onTabChange).toHaveBeenCalledWith('tab2');
    
    // 두 번째 탭이 활성화되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('content-2')).toBeInTheDocument();
    });
  });

  it('defaultActiveKey로 초기 활성 탭을 설정할 수 있다', () => {
    render(<Tabs items={sampleItems} defaultActiveKey="tab2" />);
    
    const secondTab = screen.getByText('두 번째 탭').closest('button');
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
  });

  it('controlled 모드로 작동한다', () => {
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} activeKey="tab2" onTabChange={onTabChange} />);
    
    const secondTab = screen.getByText('두 번째 탭').closest('button');
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
  });

  it('비활성화된 탭은 클릭할 수 없다', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} onTabChange={onTabChange} />);
    
    // 비활성 탭 클릭
    const disabledTab = screen.getByText('비활성 탭');
    await user.click(disabledTab);
    
    expect(onTabChange).not.toHaveBeenCalled();
    expect(screen.queryByTestId('content-4')).not.toBeInTheDocument();
  });

  it('탭 닫기가 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onTabClose = jest.fn();
    
    render(<Tabs items={closableItems} closable={true} onTabClose={onTabClose} />);
    
    // 첫 번째 탭의 닫기 버튼 클릭
    const closeButton = screen.getByLabelText('닫을 수 있는 탭 1 닫기');
    await user.click(closeButton);
    
    expect(onTabClose).toHaveBeenCalledWith('tab1');
    
    // 첫 번째 탭이 사라져야 함
    await waitFor(() => {
      expect(screen.queryByText('닫을 수 있는 탭 1')).not.toBeInTheDocument();
    });
  });

  it('닫을 수 없는 탭은 닫기 버튼이 표시되지 않는다', () => {
    render(<Tabs items={closableItems} closable={true} />);
    
    expect(screen.queryByLabelText('닫을 수 없는 탭 닫기')).not.toBeInTheDocument();
  });

  it('탭 추가가 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onTabAdd = jest.fn();
    
    render(<Tabs items={sampleItems} addable={true} onTabAdd={onTabAdd} />);
    
    // 탭 추가 버튼 클릭
    const addButton = screen.getByLabelText('탭 추가');
    await user.click(addButton);
    
    expect(onTabAdd).toHaveBeenCalled();
  });

  it('아이콘이 올바르게 표시된다', () => {
    render(<Tabs items={sampleItems} showIcons={true} />);
    
    expect(screen.getByText('📄')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
  });

  it('아이콘이 숨겨질 수 있다', () => {
    render(<Tabs items={sampleItems} showIcons={false} />);
    
    expect(screen.queryByText('📄')).not.toBeInTheDocument();
    expect(screen.queryByText('📊')).not.toBeInTheDocument();
    expect(screen.queryByText('⚙️')).not.toBeInTheDocument();
  });

  it('키보드 네비게이션이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} onTabChange={onTabChange} />);
    
    const firstTab = screen.getByText('첫 번째 탭').closest('button');
    firstTab!.focus();
    
    // ArrowRight 키로 다음 탭으로 이동
    await user.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith('tab2');
    
    // ArrowLeft 키로 이전 탭으로 이동
    await user.keyboard('{ArrowLeft}');
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });

  it('Enter 키로 탭을 활성화할 수 있다', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} onTabChange={onTabChange} />);
    
    const secondTab = screen.getByText('두 번째 탭').closest('button');
    secondTab!.focus();
    
    // Enter 키로 탭 활성화
    await user.keyboard('{Enter}');
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('Space 키로 탭을 활성화할 수 있다', async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    
    render(<Tabs items={sampleItems} onTabChange={onTabChange} />);
    
    const secondTab = screen.getByText('두 번째 탭').closest('button');
    secondTab!.focus();
    
    // Space 키로 탭 활성화
    await user.keyboard(' ');
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('다양한 타입으로 렌더링된다', () => {
    const { rerender } = render(<Tabs items={sampleItems} type="line" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--line');
    
    rerender(<Tabs items={sampleItems} type="card" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--card');
    
    rerender(<Tabs items={sampleItems} type="segment" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--segment');
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(<Tabs items={sampleItems} size="sm" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--sm');
    
    rerender(<Tabs items={sampleItems} size="md" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--md');
    
    rerender(<Tabs items={sampleItems} size="lg" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--lg');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(<Tabs items={sampleItems} variant="default" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--default');
    
    rerender(<Tabs items={sampleItems} variant="outlined" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--outlined');
    
    rerender(<Tabs items={sampleItems} variant="filled" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--filled');
  });

  it('다양한 위치로 렌더링된다', () => {
    const { rerender } = render(<Tabs items={sampleItems} position="top" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--top');
    
    rerender(<Tabs items={sampleItems} position="bottom" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--bottom');
    
    rerender(<Tabs items={sampleItems} position="left" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--left');
    
    rerender(<Tabs items={sampleItems} position="right" />);
    expect(screen.getByRole('tablist')).toHaveClass('tabList--right');
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(<Tabs items={sampleItems} aria-label="메인 탭" />);
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', '메인 탭');
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
    
    // 첫 번째 탭이 활성화되어 있어야 함
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    
    // 나머지 탭들은 비활성화되어 있어야 함
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  it('비활성화된 탭의 접근성 속성이 올바르게 설정된다', () => {
    render(<Tabs items={sampleItems} />);
    
    const disabledTab = screen.getByText('비활성 탭').closest('button');
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    expect(disabledTab).toHaveAttribute('disabled');
  });

  it('탭 패널의 접근성 속성이 올바르게 설정된다', () => {
    render(<Tabs items={sampleItems} />);
    
    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(4);
    
    // 첫 번째 패널만 보여야 함
    expect(panels[0]).not.toHaveAttribute('hidden');
    expect(panels[1]).toHaveAttribute('hidden');
    expect(panels[2]).toHaveAttribute('hidden');
    expect(panels[3]).toHaveAttribute('hidden');
  });

  it('애니메이션이 올바르게 적용된다', () => {
    render(<Tabs items={sampleItems} animated={true} />);
    
    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0]).toHaveClass('tabPanelAnimated');
  });

  it('애니메이션이 비활성화될 수 있다', () => {
    render(<Tabs items={sampleItems} animated={false} />);
    
    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0]).not.toHaveClass('tabPanelAnimated');
  });

  it('빈 아이템 배열로 렌더링된다', () => {
    render(<Tabs items={[]} />);
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('items가 변경되면 탭이 업데이트된다', () => {
    const { rerender } = render(<Tabs items={sampleItems} />);
    
    expect(screen.getByText('첫 번째 탭')).toBeInTheDocument();
    
    const newItems: TabItem[] = [
      {
        key: 'new1',
        label: '새 탭 1',
        content: <div>새 탭 1 내용</div>,
      },
      {
        key: 'new2',
        label: '새 탭 2',
        content: <div>새 탭 2 내용</div>,
      },
    ];
    
    rerender(<Tabs items={newItems} />);
    
    expect(screen.queryByText('첫 번째 탭')).not.toBeInTheDocument();
    expect(screen.getByText('새 탭 1')).toBeInTheDocument();
    expect(screen.getByText('새 탭 2')).toBeInTheDocument();
  });

  it('활성 탭이 제거되면 첫 번째 탭이 활성화된다', async () => {
    const user = userEvent.setup();
    const onTabClose = jest.fn();
    
    render(<Tabs items={closableItems} closable={true} onTabClose={onTabClose} />);
    
    // 두 번째 탭을 활성화
    const secondTab = screen.getByText('닫을 수 있는 탭 2');
    await user.click(secondTab);
    
    // 두 번째 탭 닫기
    const closeButton = screen.getByLabelText('닫을 수 있는 탭 2 닫기');
    await user.click(closeButton);
    
    // 첫 번째 탭이 활성화되어야 함
    await waitFor(() => {
      const firstTab = screen.getByText('닫을 수 있는 탭 1').closest('button');
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
    });
  });
}); 