import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, FileIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Tree',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '계층 구조의 데이터를 트리 형태로 표시하는 컴포넌트입니다. 폴더와 파일 구조, 확장/축소 기능을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '트리 데이터',
      control: 'object'
    },
    expandAll: {
      description: '모든 노드 확장',
      control: 'boolean'
    },
    selectable: {
      description: '선택 가능 여부',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 트리 노드 컴포넌트
interface TreeNodeProps {
  node: {
    id: string;
    name: string;
    type: 'folder' | 'file';
    children?: TreeNodeProps['node'][];
  };
  level?: number;
  expanded?: Set<string>;
  selected?: Set<string>;
  onToggle?: (id: string) => void;
  onSelect?: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level = 0,
  expanded = new Set(),
  selected = new Set(),
  onToggle,
  onSelect
}) => {
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer ${
          isSelected ? 'bg-blue-100' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => {
          if (hasChildren) {
            onToggle?.(node.id);
          }
          onSelect?.(node.id);
        }}
      >
        {hasChildren ? (
          <div className="w-4 h-4 mr-2">
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </div>
        ) : (
          <div className="w-4 h-4 mr-2" />
        )}
        
        {node.type === 'folder' ? (
          <FolderIcon className="w-4 h-4 mr-2 text-yellow-500" />
        ) : (
          <FileIcon className="w-4 h-4 mr-2 text-gray-500" />
        )}
        
        <span className="text-sm">{node.name}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 기본 트리
export const Default: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const treeData = {
      id: 'root',
      name: '프로젝트',
      type: 'folder' as const,
      children: [
        {
          id: 'src',
          name: 'src',
          type: 'folder' as const,
          children: [
            {
              id: 'components',
              name: 'components',
              type: 'folder' as const,
              children: [
                { id: 'Button.tsx', name: 'Button.tsx', type: 'file' as const },
                { id: 'Input.tsx', name: 'Input.tsx', type: 'file' as const },
                { id: 'Modal.tsx', name: 'Modal.tsx', type: 'file' as const }
              ]
            },
            {
              id: 'pages',
              name: 'pages',
              type: 'folder' as const,
              children: [
                { id: 'Home.tsx', name: 'Home.tsx', type: 'file' as const },
                { id: 'About.tsx', name: 'About.tsx', type: 'file' as const }
              ]
            },
            { id: 'App.tsx', name: 'App.tsx', type: 'file' as const },
            { id: 'index.tsx', name: 'index.tsx', type: 'file' as const }
          ]
        },
        {
          id: 'public',
          name: 'public',
          type: 'folder' as const,
          children: [
            { id: 'index.html', name: 'index.html', type: 'file' as const },
            { id: 'favicon.ico', name: 'favicon.ico', type: 'file' as const }
          ]
        },
        { id: 'package.json', name: 'package.json', type: 'file' as const },
        { id: 'README.md', name: 'README.md', type: 'file' as const }
      ]
    };

    const handleToggle = (id: string) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpanded(newExpanded);
    };

    const handleSelect = (id: string) => {
      const newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelected(newSelected);
    };

    return (
      <div className="border rounded-lg p-4 w-80 max-h-96 overflow-auto">
        <TreeNode
          node={treeData}
          expanded={expanded}
          selected={selected}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      </div>
    );
  }
};

// 파일 탐색기 스타일
export const FileExplorer: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const fileData = {
      id: 'root',
      name: '내 문서',
      type: 'folder' as const,
      children: [
        {
          id: 'work',
          name: '업무',
          type: 'folder' as const,
          children: [
            {
              id: 'reports',
              name: '보고서',
              type: 'folder' as const,
              children: [
                { id: 'q1-report.pdf', name: 'Q1 보고서.pdf', type: 'file' as const },
                { id: 'q2-report.pdf', name: 'Q2 보고서.pdf', type: 'file' as const }
              ]
            },
            { id: 'presentation.pptx', name: '프레젠테이션.pptx', type: 'file' as const },
            { id: 'budget.xlsx', name: '예산.xlsx', type: 'file' as const }
          ]
        },
        {
          id: 'personal',
          name: '개인',
          type: 'folder' as const,
          children: [
            { id: 'photos', name: '사진', type: 'folder' as const, children: [] },
            { id: 'documents', name: '문서', type: 'folder' as const, children: [] }
          ]
        },
        { id: 'notes.txt', name: '메모.txt', type: 'file' as const }
      ]
    };

    const handleToggle = (id: string) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpanded(newExpanded);
    };

    const handleSelect = (id: string) => {
      setSelected(new Set([id]));
    };

    return (
      <div className="border rounded-lg p-4 w-80 max-h-96 overflow-auto bg-white">
        <div className="mb-4 pb-2 border-b">
          <h3 className="font-medium text-gray-900">파일 탐색기</h3>
        </div>
        <TreeNode
          node={fileData}
          expanded={expanded}
          selected={selected}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      </div>
    );
  }
};

// 다중 선택 트리
export const MultiSelect: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const categoryData = {
      id: 'root',
      name: '카테고리',
      type: 'folder' as const,
      children: [
        {
          id: 'electronics',
          name: '전자제품',
          type: 'folder' as const,
          children: [
            { id: 'smartphones', name: '스마트폰', type: 'folder' as const, children: [] },
            { id: 'laptops', name: '노트북', type: 'folder' as const, children: [] },
            { id: 'tablets', name: '태블릿', type: 'folder' as const, children: [] }
          ]
        },
        {
          id: 'clothing',
          name: '의류',
          type: 'folder' as const,
          children: [
            { id: 'men', name: '남성복', type: 'folder' as const, children: [] },
            { id: 'women', name: '여성복', type: 'folder' as const, children: [] },
            { id: 'kids', name: '아동복', type: 'folder' as const, children: [] }
          ]
        },
        {
          id: 'books',
          name: '도서',
          type: 'folder' as const,
          children: [
            { id: 'fiction', name: '소설', type: 'folder' as const, children: [] },
            { id: 'nonfiction', name: '비소설', type: 'folder' as const, children: [] },
            { id: 'magazines', name: '잡지', type: 'folder' as const, children: [] }
          ]
        }
      ]
    };

    const handleToggle = (id: string) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpanded(newExpanded);
    };

    const handleSelect = (id: string) => {
      const newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelected(newSelected);
    };

    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 w-80 max-h-96 overflow-auto">
          <TreeNode
            node={categoryData}
            expanded={expanded}
            selected={selected}
            onToggle={handleToggle}
            onSelect={handleSelect}
          />
        </div>
        <div className="text-sm text-gray-600">
          선택된 항목: {Array.from(selected).join(', ') || '없음'}
        </div>
      </div>
    );
  }
};

// 확장된 트리
export const Expanded: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    
    // 모든 노드가 확장된 상태
    const expanded = new Set(['root', 'src', 'components', 'pages', 'public']);

    const treeData = {
      id: 'root',
      name: '프로젝트',
      type: 'folder' as const,
      children: [
        {
          id: 'src',
          name: 'src',
          type: 'folder' as const,
          children: [
            {
              id: 'components',
              name: 'components',
              type: 'folder' as const,
              children: [
                { id: 'Button.tsx', name: 'Button.tsx', type: 'file' as const },
                { id: 'Input.tsx', name: 'Input.tsx', type: 'file' as const }
              ]
            },
            {
              id: 'pages',
              name: 'pages',
              type: 'folder' as const,
              children: [
                { id: 'Home.tsx', name: 'Home.tsx', type: 'file' as const }
              ]
            }
          ]
        },
        {
          id: 'public',
          name: 'public',
          type: 'folder' as const,
          children: [
            { id: 'index.html', name: 'index.html', type: 'file' as const }
          ]
        }
      ]
    };

    const handleSelect = (id: string) => {
      setSelected(new Set([id]));
    };

    return (
      <div className="border rounded-lg p-4 w-80 max-h-96 overflow-auto">
        <TreeNode
          node={treeData}
          expanded={expanded}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    );
  }
}; 