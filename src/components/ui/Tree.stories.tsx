import type { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeNode } from './Tree';
import { Badge } from './Badge';

const meta: Meta<typeof Tree> = {
  title: 'UI/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '트리 컴포넌트입니다. 계층적 데이터를 표시하며 노드 선택, 확장/축소, 체크박스, 드래그 앤 드롭 기능을 제공합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '트리 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '트리 테마'
    },
    selectable: {
      control: 'boolean',
      description: '노드 선택 가능 여부'
    },
    multiple: {
      control: 'boolean',
      description: '다중 선택 가능 여부'
    },
    checkable: {
      control: 'boolean',
      description: '체크박스 표시 여부'
    },
    draggable: {
      control: 'boolean',
      description: '드래그 앤 드롭 가능 여부'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', width: '100%', maxWidth: '600px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleData: TreeNode[] = [
  {
    key: '1',
    title: '프로젝트',
    type: 'folder',
    icon: '📁',
    children: [
      {
        key: '1-1',
        title: '프론트엔드',
        type: 'folder',
        icon: '📁',
        badge: 'New',
        children: [
          {
            key: '1-1-1',
            title: 'React',
            type: 'folder',
            icon: '📁',
            count: 5,
            children: [
              {
                key: '1-1-1-1',
                title: 'App.tsx',
                type: 'file',
                icon: '📄'
              },
              {
                key: '1-1-1-2',
                title: 'index.tsx',
                type: 'file',
                icon: '📄'
              }
            ]
          },
          {
            key: '1-1-2',
            title: 'TypeScript',
            type: 'folder',
            icon: '📁',
            count: 3,
            children: [
              {
                key: '1-1-2-1',
                title: 'types.ts',
                type: 'file',
                icon: '📄'
              }
            ]
          }
        ]
      },
      {
        key: '1-2',
        title: '백엔드',
        type: 'folder',
        icon: '📁',
        children: [
          {
            key: '1-2-1',
            title: 'Node.js',
            type: 'folder',
            icon: '📁',
            children: [
              {
                key: '1-2-1-1',
                title: 'server.js',
                type: 'file',
                icon: '📄'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '문서',
    type: 'folder',
    icon: '📁',
    children: [
      {
        key: '2-1',
        title: 'README.md',
        type: 'file',
        icon: '📄'
      },
      {
        key: '2-2',
        title: 'API.md',
        type: 'file',
        icon: '📄'
      }
    ]
  }
];

// 액션이 있는 데이터
const dataWithActions: TreeNode[] = [
  {
    key: '1',
    title: '사용자 관리',
    type: 'folder',
    icon: '👥',
    actions: [
      {
        key: 'add',
        label: '추가',
        type: 'primary',
        onClick: (node: TreeNode) => console.log('추가:', node)
      },
      {
        key: 'edit',
        label: '수정',
        onClick: (node: TreeNode) => console.log('수정:', node)
      }
    ],
    children: [
      {
        key: '1-1',
        title: '관리자',
        type: 'folder',
        icon: '👤',
        actions: [
          {
            key: 'delete',
            label: '삭제',
            type: 'danger',
            onClick: (node) => console.log('삭제:', node)
          }
        ],
        children: [
          {
            key: '1-1-1',
            title: 'admin.json',
            type: 'file',
            icon: '📄'
          }
        ]
      }
    ]
  }
];

// 기본 트리
export const Default: Story = {
  args: {
    data: sampleData
  }
};

// 선택 가능한 트리
export const Selectable: Story = {
  args: {
    data: sampleData,
    selectable: true
  }
};

// 다중 선택 가능한 트리
export const MultipleSelect: Story = {
  args: {
    data: sampleData,
    selectable: true,
    multiple: true
  }
};

// 체크박스가 있는 트리
export const Checkable: Story = {
  args: {
    data: sampleData,
    checkable: true
  }
};

// 드래그 앤 드롭이 가능한 트리
export const Draggable: Story = {
  args: {
    data: sampleData,
    draggable: true,
    onDrop: (dragNode, dropNode, position) => {
      console.log('드래그 앤 드롭:', { dragNode, dropNode, position });
    }
  }
};

// 액션이 있는 트리
export const WithActions: Story = {
  args: {
    data: dataWithActions,
    selectable: true
  }
};

// 크기별 트리
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Tree
          size="sm"
          data={sampleData.slice(0, 1)}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Tree
          data={sampleData.slice(0, 1)}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Tree
          size="lg"
          data={sampleData.slice(0, 1)}
        />
      </div>
    </div>
  )
};

// 테마별 트리
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Tree
          data={sampleData.slice(0, 1)}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Tree
          theme="primary"
          data={sampleData.slice(0, 1)}
          selectable={true}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Tree
          theme="success"
          data={sampleData.slice(0, 1)}
          selectable={true}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Tree
          theme="warning"
          data={sampleData.slice(0, 1)}
          selectable={true}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Tree
          theme="error"
          data={sampleData.slice(0, 1)}
          selectable={true}
        />
      </div>
    </div>
  )
};

// 비활성화된 노드가 있는 트리
export const WithDisabledNodes: Story = {
  args: {
    data: [
      {
        key: '1',
        title: '활성 노드',
        type: 'folder',
        icon: '📁',
        children: [
          {
            key: '1-1',
            title: '비활성 노드',
            type: 'file',
            icon: '📄',
            disabled: true
          }
        ]
      }
    ],
    selectable: true
  }
};

// 검색이 가능한 트리
export const WithSearch: Story = {
  args: {
    data: sampleData,
    searchValue: 'React',
    filterNode: (node, searchValue) => 
      node.title.toLowerCase().includes(searchValue.toLowerCase())
  }
};

// 로딩 상태 트리
export const Loading: Story = {
  args: {
    data: [],
    loading: true
  }
};

// 빈 상태 트리
export const Empty: Story = {
  args: {
    data: [],
    emptyText: '폴더가 없습니다. 새로운 폴더를 생성해보세요.'
  }
};

// 복잡한 트리 (모든 기능 포함)
export const Complex: Story = {
  args: {
    data: [
      {
        key: '1',
        title: '프로젝트 루트',
        type: 'folder',
        icon: '🏠',
        badge: 'Main',
        count: 10,
        actions: [
          {
            key: 'add',
            label: '추가',
            type: 'primary',
            onClick: (node) => console.log('추가:', node)
          }
        ],
        children: [
          {
            key: '1-1',
            title: '개발 환경',
            type: 'folder',
            icon: '⚙️',
            count: 3,
            children: [
              {
                key: '1-1-1',
                title: 'package.json',
                type: 'file',
                icon: '📦',
                actions: [
                  {
                    key: 'edit',
                    label: '편집',
                    onClick: (node) => console.log('편집:', node)
                  },
                  {
                    key: 'delete',
                    label: '삭제',
                    type: 'danger',
                    onClick: (node) => console.log('삭제:', node)
                  }
                ]
              },
              {
                key: '1-1-2',
                title: 'tsconfig.json',
                type: 'file',
                icon: '⚙️'
              }
            ]
          },
          {
            key: '1-2',
            title: '소스 코드',
            type: 'folder',
            icon: '💻',
            count: 5,
            children: [
              {
                key: '1-2-1',
                title: '컴포넌트',
                type: 'folder',
                icon: '🧩',
                children: [
                  {
                    key: '1-2-1-1',
                    title: 'Button.tsx',
                    type: 'file',
                    icon: '🔘'
                  },
                  {
                    key: '1-2-1-2',
                    title: 'Input.tsx',
                    type: 'file',
                    icon: '📝'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    selectable: true,
    multiple: true,
    checkable: true,
    draggable: true,
    onSelect: (selectedKeys, node) => console.log('선택:', selectedKeys, node),
    onCheck: (checkedKeys, node) => console.log('체크:', checkedKeys, node),
    onExpand: (expandedKeys, node) => console.log('확장:', expandedKeys, node),
    onNodeClick: (node) => console.log('클릭:', node),
    onNodeDoubleClick: (node) => console.log('더블클릭:', node),
    onDrop: (dragNode, dropNode, position) => console.log('드롭:', { dragNode, dropNode, position })
  }
}; 