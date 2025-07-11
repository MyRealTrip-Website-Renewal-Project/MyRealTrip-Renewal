import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu, MenuItem } from '../../components/ui/Menu';

const sampleItems: MenuItem[] = [
  {
    key: 'new',
    label: '새로 만들기',
    icon: '📄',
    shortcut: 'Ctrl+N',
    onClick: jest.fn(),
  },
  {
    key: 'open',
    label: '열기',
    icon: '📁',
    shortcut: 'Ctrl+O',
    onClick: jest.fn(),
  },
  {
    key: 'export',
    label: '내보내기',
    icon: '📤',
    children: [
      {
        key: 'export-pdf',
        label: 'PDF로 내보내기',
        icon: '📄',
        onClick: jest.fn(),
      },
      {
        key: 'export-excel',
        label: 'Excel로 내보내기',
        icon: '📊',
        onClick: jest.fn(),
      },
    ],
  },
  {
    key: 'divider',
    divider: true,
  },
  {
    key: 'settings',
    label: '설정',
    icon: '⚙️',
    onClick: jest.fn(),
  },
  {
    key: 'help',
    label: '도움말',
    icon: '❓',
    disabled: true,
    onClick: jest.fn(),
  },
];

describe('Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 렌더링이 올바르게 작동한다', () => {
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    expect(screen.getByText('메뉴 열기')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('클릭으로 메뉴가 열리고 닫힌다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 초기에는 메뉴가 닫혀있어야 함
    expect(screen.queryByText('새로 만들기')).not.toBeInTheDocument();
    
    // 트리거 클릭
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴가 열려야 함
    await waitFor(() => {
      expect(screen.getByText('새로 만들기')).toBeInTheDocument();
      expect(screen.getByText('열기')).toBeInTheDocument();
      expect(screen.getByText('내보내기')).toBeInTheDocument();
    });
    
    // 다시 클릭하여 닫기
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.queryByText('새로 만들기')).not.toBeInTheDocument();
    });
  });

  it('메뉴 아이템 클릭이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    
    render(
      <Menu items={sampleItems} onItemClick={onItemClick}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴 아이템 클릭
    const menuItem = screen.getByText('새로 만들기');
    await user.click(menuItem);
    
    expect(sampleItems[0].onClick).toHaveBeenCalled();
    expect(onItemClick).toHaveBeenCalledWith('new', sampleItems[0]);
    
    // 메뉴가 닫혀야 함
    await waitFor(() => {
      expect(screen.queryByText('새로 만들기')).not.toBeInTheDocument();
    });
  });

  it('서브메뉴가 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 서브메뉴가 있는 아이템 클릭
    const submenuItem = screen.getByText('내보내기');
    await user.click(submenuItem);
    
    // 서브메뉴가 열려야 함
    await waitFor(() => {
      expect(screen.getByText('PDF로 내보내기')).toBeInTheDocument();
      expect(screen.getByText('Excel로 내보내기')).toBeInTheDocument();
    });
    
    // 서브메뉴 아이템 클릭
    const submenuSubItem = screen.getByText('PDF로 내보내기');
    await user.click(submenuSubItem);
    
    expect(sampleItems[2].children![0].onClick).toHaveBeenCalled();
  });

  it('비활성화된 메뉴 아이템은 클릭할 수 없다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 비활성화된 아이템 클릭
    const disabledItem = screen.getByText('도움말');
    await user.click(disabledItem);
    
    expect(sampleItems[5].onClick).not.toHaveBeenCalled();
  });

  it('구분선이 올바르게 렌더링된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 구분선이 렌더링되어야 함
    const dividers = document.querySelectorAll('.menuDivider');
    expect(dividers.length).toBeGreaterThan(0);
  });

  it('아이콘이 올바르게 표시된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems} showIcons={true}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 아이콘이 표시되어야 함
    expect(screen.getByText('📄')).toBeInTheDocument();
    expect(screen.getByText('📁')).toBeInTheDocument();
    expect(screen.getByText('📤')).toBeInTheDocument();
  });

  it('아이콘이 숨겨질 수 있다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems} showIcons={false}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 아이콘이 표시되지 않아야 함
    expect(screen.queryByText('📄')).not.toBeInTheDocument();
    expect(screen.queryByText('📁')).not.toBeInTheDocument();
  });

  it('단축키가 올바르게 표시된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems} showShortcuts={true}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 단축키가 표시되어야 함
    expect(screen.getByText('Ctrl+N')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+O')).toBeInTheDocument();
  });

  it('단축키가 숨겨질 수 있다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems} showShortcuts={false}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 단축키가 표시되지 않아야 함
    expect(screen.queryByText('Ctrl+N')).not.toBeInTheDocument();
    expect(screen.queryByText('Ctrl+O')).not.toBeInTheDocument();
  });

  it('외부 클릭으로 메뉴가 닫힌다', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <Menu items={sampleItems}>
          <button>메뉴 열기</button>
        </Menu>
        <button>외부 버튼</button>
      </div>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴가 열려야 함
    await waitFor(() => {
      expect(screen.getByText('새로 만들기')).toBeInTheDocument();
    });
    
    // 외부 클릭
    const outsideButton = screen.getByText('외부 버튼');
    await user.click(outsideButton);
    
    // 메뉴가 닫혀야 함
    await waitFor(() => {
      expect(screen.queryByText('새로 만들기')).not.toBeInTheDocument();
    });
  });

  it('ESC 키로 메뉴가 닫힌다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴가 열려야 함
    await waitFor(() => {
      expect(screen.getByText('새로 만들기')).toBeInTheDocument();
    });
    
    // ESC 키 누르기
    await user.keyboard('{Escape}');
    
    // 메뉴가 닫혀야 함
    await waitFor(() => {
      expect(screen.queryByText('새로 만들기')).not.toBeInTheDocument();
    });
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(
      <Menu items={sampleItems} size="sm">
        <button>작은 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--sm');
    
    rerender(
      <Menu items={sampleItems} size="md">
        <button>중간 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--md');
    
    rerender(
      <Menu items={sampleItems} size="lg">
        <button>큰 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--lg');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(
      <Menu items={sampleItems} variant="default">
        <button>기본 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--default');
    
    rerender(
      <Menu items={sampleItems} variant="outlined">
        <button>테두리 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--outlined');
    
    rerender(
      <Menu items={sampleItems} variant="filled">
        <button>채워진 메뉴</button>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveClass('menuTrigger--filled');
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(
      <Menu items={sampleItems} aria-label="파일 메뉴">
        <button>메뉴 열기</button>
      </Menu>
    );
    
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-label', '파일 메뉴');
  });

  it('메뉴가 열렸을 때 접근성 속성이 업데이트된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // 메뉴 열기
    await user.click(trigger);
    
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('메뉴 아이템에 접근성 속성이 설정된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems}>
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴 아이템들이 올바른 역할을 가져야 함
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBeGreaterThan(0);
    
    // 서브메뉴가 있는 아이템은 aria-haspopup 속성을 가져야 함
    const submenuItem = screen.getByText('내보내기');
    expect(submenuItem).toHaveAttribute('aria-haspopup', 'true');
  });

  it('빈 아이템 배열로 렌더링된다', () => {
    render(
      <Menu items={[]}>
        <button>빈 메뉴</button>
      </Menu>
    );
    
    expect(screen.getByText('빈 메뉴')).toBeInTheDocument();
  });

  it('최대 높이가 설정된다', async () => {
    const user = userEvent.setup();
    
    render(
      <Menu items={sampleItems} maxHeight="200px">
        <button>메뉴 열기</button>
      </Menu>
    );
    
    // 메뉴 열기
    const trigger = screen.getByText('메뉴 열기');
    await user.click(trigger);
    
    // 메뉴 컨테이너가 최대 높이를 가져야 함
    const menu = document.querySelector('.menu');
    expect(menu).toHaveStyle({ maxHeight: '200px' });
  });
}); 