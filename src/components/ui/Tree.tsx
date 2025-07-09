import React, { useState, ReactNode, useCallback } from 'react';
import styles from './Tree.module.scss';

export interface TreeNode<T = any> {
  /** 노드 키 */
  key: string;
  /** 노드 제목 */
  title: string;
  /** 노드 아이콘 */
  icon?: ReactNode;
  /** 노드 타입 */
  type?: 'folder' | 'file' | 'custom';
  /** 노드 데이터 */
  data?: T;
  /** 자식 노드들 */
  children?: TreeNode<T>[];
  /** 노드 비활성화 여부 */
  disabled?: boolean;
  /** 노드 배지 */
  badge?: string;
  /** 노드 카운트 */
  count?: number;
  /** 노드 확장 여부 */
  expanded?: boolean;
  /** 노드 선택 여부 */
  selected?: boolean;
  /** 노드 체크 여부 */
  checked?: boolean;
  /** 노드 액션들 */
  actions?: TreeAction<T>[];
}

export interface TreeAction<T = any> {
  /** 액션 키 */
  key: string;
  /** 액션 라벨 */
  label: string;
  /** 액션 타입 */
  type?: 'primary' | 'danger' | 'default';
  /** 액션 아이콘 */
  icon?: ReactNode;
  /** 액션 핸들러 */
  onClick: (node: TreeNode<T>) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface TreeProps<T = any> {
  /** 트리 데이터 */
  data: TreeNode<T>[];
  /** 트리 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 트리 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 선택 가능 여부 */
  selectable?: boolean;
  /** 다중 선택 가능 여부 */
  multiple?: boolean;
  /** 체크박스 표시 여부 */
  checkable?: boolean;
  /** 드래그 앤 드롭 가능 여부 */
  draggable?: boolean;
  /** 선택된 노드들 */
  selectedKeys?: string[];
  /** 체크된 노드들 */
  checkedKeys?: string[];
  /** 확장된 노드들 */
  expandedKeys?: string[];
  /** 노드 선택 핸들러 */
  onSelect?: (selectedKeys: string[], node: TreeNode<T>) => void;
  /** 노드 체크 핸들러 */
  onCheck?: (checkedKeys: string[], node: TreeNode<T>) => void;
  /** 노드 확장 핸들러 */
  onExpand?: (expandedKeys: string[], node: TreeNode<T>) => void;
  /** 노드 클릭 핸들러 */
  onNodeClick?: (node: TreeNode<T>) => void;
  /** 노드 더블클릭 핸들러 */
  onNodeDoubleClick?: (node: TreeNode<T>) => void;
  /** 드래그 앤 드롭 핸들러 */
  onDrop?: (dragNode: TreeNode<T>, dropNode: TreeNode<T>, position: 'before' | 'after' | 'inside') => void;
  /** 커스텀 클래스명 */
  className?: string;
  /** 빈 상태 메시지 */
  emptyText?: string;
  /** 로딩 상태 */
  loading?: boolean;
  /** 검색어 */
  searchValue?: string;
  /** 검색 필터 함수 */
  filterNode?: (node: TreeNode<T>, searchValue: string) => boolean;
}

export const Tree = <T extends Record<string, any>>({
  data,
  size = 'md',
  theme = 'default',
  selectable = false,
  multiple = false,
  checkable = false,
  draggable = false,
  selectedKeys = [],
  checkedKeys = [],
  expandedKeys = [],
  onSelect,
  onCheck,
  onExpand,
  onNodeClick,
  onNodeDoubleClick,
  onDrop,
  className = '',
  emptyText = '데이터가 없습니다',
  loading = false,
  searchValue = '',
  filterNode
}: TreeProps<T>) => {
  const [localSelectedKeys, setLocalSelectedKeys] = useState<string[]>(selectedKeys);
  const [localCheckedKeys, setLocalCheckedKeys] = useState<string[]>(checkedKeys);
  const [localExpandedKeys, setLocalExpandedKeys] = useState<string[]>(expandedKeys);
  const [dragNode, setDragNode] = useState<TreeNode<T> | null>(null);
  const [dropNode, setDropNode] = useState<TreeNode<T> | null>(null);

  // 노드 렌더링
  const renderNode = useCallback((node: TreeNode<T>, level: number = 0) => {
    const isExpanded = localExpandedKeys.includes(node.key);
    const isSelected = localSelectedKeys.includes(node.key);
    const isChecked = localCheckedKeys.includes(node.key);
    const hasChildren = node.children && node.children.length > 0;
    const isDragging = dragNode?.key === node.key;
    const isDragOver = dropNode?.key === node.key;

    // 검색 필터링
    if (searchValue && filterNode && !filterNode(node, searchValue)) {
      return null;
    }

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!hasChildren) return;

      const newExpandedKeys = isExpanded
        ? localExpandedKeys.filter(key => key !== node.key)
        : [...localExpandedKeys, node.key];

      setLocalExpandedKeys(newExpandedKeys);
      onExpand?.(newExpandedKeys, node);
    };

    const handleSelect = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (node.disabled) return;

      let newSelectedKeys: string[];
      if (multiple) {
        if (isSelected) {
          newSelectedKeys = localSelectedKeys.filter(key => key !== node.key);
        } else {
          newSelectedKeys = [...localSelectedKeys, node.key];
        }
      } else {
        newSelectedKeys = isSelected ? [] : [node.key];
      }

      setLocalSelectedKeys(newSelectedKeys);
      onSelect?.(newSelectedKeys, node);
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (node.disabled) return;

      const newCheckedKeys = e.target.checked
        ? [...localCheckedKeys, node.key]
        : localCheckedKeys.filter(key => key !== node.key);

      setLocalCheckedKeys(newCheckedKeys);
      onCheck?.(newCheckedKeys, node);
    };

    const handleClick = () => {
      if (node.disabled) return;
      onNodeClick?.(node);
    };

    const handleDoubleClick = () => {
      if (node.disabled) return;
      onNodeDoubleClick?.(node);
    };

    const handleDragStart = (e: React.DragEvent) => {
      if (!draggable || node.disabled) return;
      setDragNode(node);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
      if (!draggable || !dragNode || dragNode.key === node.key) return;
      e.preventDefault();
      setDropNode(node);
    };

    const handleDrop = (e: React.DragEvent) => {
      if (!draggable || !dragNode || !dropNode) return;
      e.preventDefault();
      
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      
      let position: 'before' | 'after' | 'inside';
      if (y < height / 3) {
        position = 'before';
      } else if (y > (height * 2) / 3) {
        position = 'after';
      } else {
        position = 'inside';
      }
      
      onDrop?.(dragNode, dropNode, position);
      setDragNode(null);
      setDropNode(null);
    };

    const handleDragEnd = () => {
      setDragNode(null);
      setDropNode(null);
    };

    const getNodeClasses = () => {
      const classes = [
        styles.treeNode,
        level === 0 && styles.root
      ].filter(Boolean);
      
      return classes.join(' ');
    };

    const getContentClasses = () => {
      const classes = [
        styles.treeContent,
        isSelected && styles.selected,
        node.disabled && styles.disabled,
        isDragging && styles.dragging,
        isDragOver && styles.dragOver
      ].filter(Boolean);
      
      return classes.join(' ');
    };

    const getToggleClasses = () => {
      const classes = [
        styles.treeToggle,
        isExpanded && styles.expanded
      ].filter(Boolean);
      
      return classes.join(' ');
    };

    const getIconClasses = () => {
      const classes = [
        styles.treeIcon,
        node.type && styles[node.type]
      ].filter(Boolean);
      
      return classes.join(' ');
    };

    const getChildrenClasses = () => {
      const classes = [
        styles.treeChildren,
        isExpanded ? styles.expanded : styles.collapsed
      ].filter(Boolean);
      
      return classes.join(' ');
    };

    return (
      <div key={node.key} className={getNodeClasses()}>
        <div
          className={getContentClasses()}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          draggable={draggable && !node.disabled}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          tabIndex={0}
        >
          {draggable && (
            <div className={styles.treeDragHandle}>⋮⋮</div>
          )}
          
          {checkable && (
            <div className={styles.treeCheckbox}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheck}
                disabled={node.disabled}
              />
            </div>
          )}
          
          {hasChildren && (
            <div className={getToggleClasses()} onClick={handleToggle}>
              <span className={styles.toggleIcon}>▶</span>
            </div>
          )}
          
          {node.icon && (
            <div className={getIconClasses()}>
              {node.icon}
            </div>
          )}
          
          <div className={styles.treeLabel}>
            <span className={styles.labelText}>{node.title}</span>
            {node.badge && (
              <span className={styles.labelBadge}>{node.badge}</span>
            )}
            {node.count !== undefined && (
              <span className={styles.labelCount}>{node.count}</span>
            )}
          </div>
          
          {node.actions && (
            <div className={styles.treeActions}>
              {node.actions.map(action => (
                <button
                  key={action.key}
                  className={`${styles.treeAction} ${action.type ? styles[action.type] : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(node);
                  }}
                  disabled={action.disabled}
                  title={action.label}
                >
                  {action.icon || action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {hasChildren && (
          <div className={getChildrenClasses()}>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  }, [
    localSelectedKeys,
    localCheckedKeys,
    localExpandedKeys,
    dragNode,
    dropNode,
    searchValue,
    filterNode,
    selectable,
    multiple,
    checkable,
    draggable,
    onSelect,
    onCheck,
    onExpand,
    onNodeClick,
    onNodeDoubleClick,
    onDrop
  ]);

  const getContainerClasses = () => {
    const classes = [
      styles.treeContainer,
      styles[size],
      theme !== 'default' && styles[theme],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const renderEmptyState = () => (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
      {loading ? '로딩 중...' : emptyText}
    </div>
  );

  return (
    <div className={getContainerClasses()}>
      {data.length === 0 ? (
        renderEmptyState()
      ) : (
        data.map(node => renderNode(node))
      )}
    </div>
  );
};

export default Tree; 