import React, { useState, useCallback } from 'react';
import styles from '@/styles/ui/Tree.module.scss';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  selectable?: boolean;
  multiSelect?: boolean;
  expandable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  showIcons?: boolean;
  showLines?: boolean;
  onNodeSelect?: (nodeId: string, selected: boolean) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  onNodeClick?: (nodeId: string) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  selectable = false,
  multiSelect = false,
  expandable = true,
  size = 'md',
  variant = 'default',
  showIcons = true,
  showLines = true,
  onNodeSelect,
  onNodeExpand,
  onNodeClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((nodeId: string) => {
    if (!expandable) return;

    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
    onNodeExpand?.(nodeId, newExpanded.has(nodeId));
  }, [expandedNodes, expandable, onNodeExpand]);

  const toggleSelected = useCallback((nodeId: string) => {
    if (!selectable) return;

    const newSelected = new Set(selectedNodes);
    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);
    } else {
      if (!multiSelect) {
        newSelected.clear();
      }
      newSelected.add(nodeId);
    }
    setSelectedNodes(newSelected);
    onNodeSelect?.(nodeId, newSelected.has(nodeId));
  }, [selectedNodes, selectable, multiSelect, onNodeSelect]);

  const handleNodeClick = useCallback((nodeId: string) => {
    onNodeClick?.(nodeId);
  }, [onNodeClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, nodeId: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (selectable) {
          toggleSelected(nodeId);
        } else {
          handleNodeClick(nodeId);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (expandable) {
          toggleExpanded(nodeId);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (expandedNodes.has(nodeId)) {
          toggleExpanded(nodeId);
        }
        break;
    }
  }, [selectable, expandable, toggleSelected, toggleExpanded, handleNodeClick, expandedNodes]);

  const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodes.has(node.id);
    const isDisabled = node.disabled;

    const nodeClasses = [
      styles.treeNode,
      styles[`treeNode--${size}`],
      styles[`treeNode--${variant}`],
      isSelected && styles.treeNodeSelected,
      isDisabled && styles.treeNodeDisabled,
      hasChildren && styles.treeNodeHasChildren,
    ].filter(Boolean).join(' ');

    const contentClasses = [
      styles.treeNodeContent,
      styles[`treeNodeContent--${size}`],
    ].filter(Boolean).join(' ');

    const indentStyle = {
      paddingLeft: `${level * 20}px`,
    };

    return (
      <div key={node.id} className={styles.treeNodeContainer}>
        <div
          className={nodeClasses}
          style={indentStyle}
          onClick={() => {
            if (!isDisabled) {
              if (selectable) {
                toggleSelected(node.id);
              } else {
                handleNodeClick(node.id);
              }
            }
          }}
          onKeyDown={(e) => handleKeyDown(e, node.id)}
          tabIndex={isDisabled ? -1 : 0}
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={selectable ? isSelected : undefined}
          aria-disabled={isDisabled}
          aria-label={node.label}
        >
          <div className={contentClasses}>
            {showLines && level > 0 && (
              <div className={styles.treeNodeLine} />
            )}
            
            {expandable && hasChildren && (
              <button
                type="button"
                className={styles.treeNodeToggle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(node.id);
                }}
                disabled={isDisabled}
                aria-label={isExpanded ? '축소' : '확장'}
              >
                <span className={styles.treeNodeToggleIcon}>
                  {isExpanded ? '▼' : '▶'}
                </span>
              </button>
            )}
            
            {selectable && (
              <div className={styles.treeNodeCheckbox}>
                <input
                  type={multiSelect ? 'checkbox' : 'radio'}
                  checked={isSelected}
                  onChange={() => toggleSelected(node.id)}
                  disabled={isDisabled}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {showIcons && node.icon && (
              <div className={styles.treeNodeIcon}>
                {node.icon}
              </div>
            )}
            
            <div className={styles.treeNodeLabel}>
              {node.label}
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className={styles.treeNodeChildren}>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const treeClasses = [
    styles.tree,
    styles[`tree--${size}`],
    styles[`tree--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={treeClasses}
      style={style}
      role="tree"
      aria-label={ariaLabel || '트리 구조'}
    >
      {data.map(node => renderNode(node))}
    </div>
  );
}; 