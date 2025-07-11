import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tree, TreeNode } from '../../components/ui/Tree';

const sampleData: TreeNode[] = [
  {
    id: '1',
    label: '문서',
    icon: '📁',
    children: [
      {
        id: '1-1',
        label: '작업',
        icon: '📄',
        children: [
          { id: '1-1-1', label: '보고서.docx', icon: '📝' },
          { id: '1-1-2', label: '프레젠테이션.pptx', icon: '📊' },
        ],
      },
      {
        id: '1-2',
        label: '개인',
        icon: '📄',
        children: [
          { id: '1-2-1', label: '메모.txt', icon: '📝' },
          { id: '1-2-2', label: '일정.pdf', icon: '📅' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: '이미지',
    icon: '🖼️',
    children: [
      { id: '2-1', label: '휴가 사진.jpg', icon: '📷' },
      { id: '2-2', label: '스크린샷.png', icon: '🖥️' },
    ],
  },
];

describe('Tree', () => {
  it('기본 렌더링이 올바르게 작동한다', () => {
    render(<Tree data={sampleData} />);
    
    expect(screen.getByRole('tree')).toBeInTheDocument();
    expect(screen.getByText('문서')).toBeInTheDocument();
    expect(screen.getByText('이미지')).toBeInTheDocument();
    expect(screen.getByText('📁')).toBeInTheDocument();
    expect(screen.getByText('🖼️')).toBeInTheDocument();
  });

  it('노드 확장/축소가 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onNodeExpand = jest.fn();
    
    render(<Tree data={sampleData} onNodeExpand={onNodeExpand} />);
    
    // 초기에는 하위 노드들이 보이지 않아야 함
    expect(screen.queryByText('작업')).not.toBeInTheDocument();
    expect(screen.queryByText('보고서.docx')).not.toBeInTheDocument();
    
    // 확장 버튼 클릭
    const expandButton = screen.getByLabelText('확장');
    await user.click(expandButton);
    
    // 하위 노드들이 보여야 함
    await waitFor(() => {
      expect(screen.getByText('작업')).toBeInTheDocument();
      expect(screen.getByText('개인')).toBeInTheDocument();
    });
    
    expect(onNodeExpand).toHaveBeenCalledWith('1', true);
    
    // 다시 축소
    const collapseButton = screen.getByLabelText('축소');
    await user.click(collapseButton);
    
    await waitFor(() => {
      expect(screen.queryByText('작업')).not.toBeInTheDocument();
    });
    
    expect(onNodeExpand).toHaveBeenCalledWith('1', false);
  });

  it('다중 선택이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onNodeSelect = jest.fn();
    
    render(
      <Tree 
        data={sampleData} 
        selectable={true} 
        multiSelect={true} 
        onNodeSelect={onNodeSelect} 
      />
    );
    
    // 첫 번째 노드 선택
    const firstNode = screen.getByText('문서').closest('[role="treeitem"]');
    await user.click(firstNode!);
    
    expect(onNodeSelect).toHaveBeenCalledWith('1', true);
    
    // 두 번째 노드 선택 (다중 선택이므로 첫 번째도 유지되어야 함)
    const secondNode = screen.getByText('이미지').closest('[role="treeitem"]');
    await user.click(secondNode!);
    
    expect(onNodeSelect).toHaveBeenCalledWith('2', true);
    expect(onNodeSelect).toHaveBeenCalledTimes(2);
  });

  it('단일 선택이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onNodeSelect = jest.fn();
    
    render(
      <Tree 
        data={sampleData} 
        selectable={true} 
        multiSelect={false} 
        onNodeSelect={onNodeSelect} 
      />
    );
    
    // 첫 번째 노드 선택
    const firstNode = screen.getByText('문서').closest('[role="treeitem"]');
    await user.click(firstNode!);
    
    expect(onNodeSelect).toHaveBeenCalledWith('1', true);
    
    // 두 번째 노드 선택 (단일 선택이므로 첫 번째는 해제되어야 함)
    const secondNode = screen.getByText('이미지').closest('[role="treeitem"]');
    await user.click(secondNode!);
    
    expect(onNodeSelect).toHaveBeenCalledWith('1', false);
    expect(onNodeSelect).toHaveBeenCalledWith('2', true);
  });

  it('키보드 네비게이션이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onNodeExpand = jest.fn();
    const onNodeSelect = jest.fn();
    
    render(
      <Tree 
        data={sampleData} 
        selectable={true}
        onNodeExpand={onNodeExpand}
        onNodeSelect={onNodeSelect}
      />
    );
    
    const firstNode = screen.getByText('문서').closest('[role="treeitem"]');
    firstNode!.focus();
    
    // Enter 키로 선택
    await user.keyboard('{Enter}');
    expect(onNodeSelect).toHaveBeenCalledWith('1', true);
    
    // Space 키로 선택 해제
    await user.keyboard(' ');
    expect(onNodeSelect).toHaveBeenCalledWith('1', false);
    
    // ArrowRight 키로 확장
    await user.keyboard('{ArrowRight}');
    expect(onNodeExpand).toHaveBeenCalledWith('1', true);
    
    // ArrowLeft 키로 축소
    await user.keyboard('{ArrowLeft}');
    expect(onNodeExpand).toHaveBeenCalledWith('1', false);
  });

  it('비활성화된 노드는 상호작용할 수 없다', async () => {
    const user = userEvent.setup();
    const onNodeSelect = jest.fn();
    const onNodeExpand = jest.fn();
    
    const dataWithDisabled: TreeNode[] = [
      {
        id: '1',
        label: '활성 노드',
        icon: '✅',
        children: [
          { id: '1-1', label: '비활성 노드', icon: '❌', disabled: true },
        ],
      },
    ];
    
    render(
      <Tree 
        data={dataWithDisabled} 
        selectable={true}
        onNodeSelect={onNodeSelect}
        onNodeExpand={onNodeExpand}
      />
    );
    
    const disabledNode = screen.getByText('비활성 노드').closest('[role="treeitem"]');
    await user.click(disabledNode!);
    
    expect(onNodeSelect).not.toHaveBeenCalled();
    expect(onNodeExpand).not.toHaveBeenCalled();
  });

  it('아이콘 없이 렌더링된다', () => {
    render(<Tree data={sampleData} showIcons={false} />);
    
    expect(screen.queryByText('📁')).not.toBeInTheDocument();
    expect(screen.queryByText('🖼️')).not.toBeInTheDocument();
    expect(screen.getByText('문서')).toBeInTheDocument();
    expect(screen.getByText('이미지')).toBeInTheDocument();
  });

  it('연결선 없이 렌더링된다', () => {
    render(<Tree data={sampleData} showLines={false} />);
    
    // 연결선이 없는 상태에서도 기본 기능은 작동해야 함
    expect(screen.getByText('문서')).toBeInTheDocument();
    expect(screen.getByText('이미지')).toBeInTheDocument();
  });

  it('확장 불가능한 트리에서 확장 버튼이 보이지 않는다', () => {
    render(<Tree data={sampleData} expandable={false} />);
    
    expect(screen.queryByLabelText('확장')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('축소')).not.toBeInTheDocument();
  });

  it('선택 불가능한 트리에서 체크박스가 보이지 않는다', () => {
    render(<Tree data={sampleData} selectable={false} />);
    
    const checkboxes = screen.queryAllByRole('checkbox');
    const radios = screen.queryAllByRole('radio');
    
    expect(checkboxes).toHaveLength(0);
    expect(radios).toHaveLength(0);
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(<Tree data={sampleData} size="sm" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--sm');
    
    rerender(<Tree data={sampleData} size="md" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--md');
    
    rerender(<Tree data={sampleData} size="lg" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--lg');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(<Tree data={sampleData} variant="default" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--default');
    
    rerender(<Tree data={sampleData} variant="outlined" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--outlined');
    
    rerender(<Tree data={sampleData} variant="filled" />);
    expect(screen.getByRole('tree')).toHaveClass('tree--filled');
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(<Tree data={sampleData} selectable={true} />);
    
    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('aria-label', '트리 구조');
    
    const treeItems = screen.getAllByRole('treeitem');
    expect(treeItems).toHaveLength(2); // 최상위 노드 2개
    
    // 첫 번째 노드는 자식이 있으므로 aria-expanded 속성이 있어야 함
    expect(treeItems[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('사용자 정의 aria-label을 지원한다', () => {
    render(<Tree data={sampleData} aria-label="파일 탐색기" />);
    
    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('aria-label', '파일 탐색기');
  });

  it('노드 클릭 콜백이 올바르게 호출된다', async () => {
    const user = userEvent.setup();
    const onNodeClick = jest.fn();
    
    render(<Tree data={sampleData} onNodeClick={onNodeClick} />);
    
    const firstNode = screen.getByText('문서').closest('[role="treeitem"]');
    await user.click(firstNode!);
    
    expect(onNodeClick).toHaveBeenCalledWith('1');
  });

  it('빈 데이터로 렌더링된다', () => {
    render(<Tree data={[]} />);
    
    const tree = screen.getByRole('tree');
    expect(tree).toBeInTheDocument();
    expect(tree.children).toHaveLength(0);
  });

  it('깊은 중첩 구조를 올바르게 렌더링한다', async () => {
    const user = userEvent.setup();
    const deepData: TreeNode[] = [
      {
        id: '1',
        label: 'Level 1',
        children: [
          {
            id: '1-1',
            label: 'Level 2',
            children: [
              {
                id: '1-1-1',
                label: 'Level 3',
                children: [
                  { id: '1-1-1-1', label: 'Level 4' },
                ],
              },
            ],
          },
        ],
      },
    ];
    
    render(<Tree data={deepData} />);
    
    // 첫 번째 레벨 확장
    const expandButton1 = screen.getByLabelText('확장');
    await user.click(expandButton1);
    
    await waitFor(() => {
      expect(screen.getByText('Level 2')).toBeInTheDocument();
    });
    
    // 두 번째 레벨 확장
    const expandButton2 = screen.getByLabelText('확장');
    await user.click(expandButton2);
    
    await waitFor(() => {
      expect(screen.getByText('Level 3')).toBeInTheDocument();
    });
    
    // 세 번째 레벨 확장
    const expandButton3 = screen.getByLabelText('확장');
    await user.click(expandButton3);
    
    await waitFor(() => {
      expect(screen.getByText('Level 4')).toBeInTheDocument();
    });
  });
}); 