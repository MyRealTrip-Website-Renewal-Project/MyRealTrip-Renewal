import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from '../../components/ui/Tag';

describe('Tag', () => {
  it('renders tag with children', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Tag variant="default">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--default');

    rerender(<Tag variant="primary">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--primary');

    rerender(<Tag variant="secondary">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--secondary');

    rerender(<Tag variant="success">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--success');

    rerender(<Tag variant="warning">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--warning');

    rerender(<Tag variant="error">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--error');

    rerender(<Tag variant="info">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--info');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Tag size="sm">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--sm');

    rerender(<Tag size="md">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--md');

    rerender(<Tag size="lg">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tag--lg');
  });

  it('applies closable class when closable is true', () => {
    render(<Tag closable>Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tagClosable');
  });

  it('applies clickable class when onClick is provided', () => {
    render(<Tag onClick={() => {}}>Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tagClickable');
  });

  it('applies disabled class when disabled is true', () => {
    render(<Tag disabled>Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('tagDisabled');
  });

  it('renders close button when closable is true', () => {
    render(<Tag closable>Tag</Tag>);
    const closeButton = screen.getByRole('button', { name: '태그 제거' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent('×');
  });

  it('does not render close button when closable is false', () => {
    render(<Tag>Tag</Tag>);
    expect(screen.queryByRole('button', { name: '태그 제거' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Tag closable onClose={handleClose}>Tag</Tag>);
    
    fireEvent.click(screen.getByRole('button', { name: '태그 제거' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when disabled', () => {
    const handleClose = jest.fn();
    render(<Tag closable disabled onClose={handleClose}>Tag</Tag>);
    
    fireEvent.click(screen.getByRole('button', { name: '태그 제거' }));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClick when tag is clicked', () => {
    const handleClick = jest.fn();
    render(<Tag onClick={handleClick}>Tag</Tag>);
    
    fireEvent.click(screen.getByText('Tag').closest('.tag')!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Tag onClick={handleClick} disabled>Tag</Tag>);
    
    fireEvent.click(screen.getByText('Tag').closest('.tag')!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents event propagation on close button click', () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    render(<Tag closable onClick={handleClick} onClose={handleClose}>Tag</Tag>);
    
    fireEvent.click(screen.getByRole('button', { name: '태그 제거' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Tag className="custom-tag">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.tag')).toHaveClass('custom-tag');
  });

  it('applies custom style', () => {
    render(<Tag style={{ backgroundColor: 'red' }}>Tag</Tag>);
    const tag = screen.getByText('Tag').closest('.tag');
    expect(tag).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders tag content correctly', () => {
    render(<Tag>복잡한 <strong>태그</strong> 내용</Tag>);
    expect(screen.getByText('복잡한')).toBeInTheDocument();
    expect(screen.getByText('태그')).toBeInTheDocument();
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('combines multiple props correctly', () => {
    render(
      <Tag 
        variant="primary" 
        size="lg" 
        closable 
        className="custom-class"
        style={{ margin: '10px' }}
      >
        Tag
      </Tag>
    );
    const tag = screen.getByText('Tag').closest('.tag');
    expect(tag).toHaveClass(
      'tag--primary',
      'tag--lg',
      'tagClosable',
      'custom-class'
    );
    expect(tag).toHaveStyle({ margin: '10px' });
  });

  it('renders close button with correct accessibility attributes', () => {
    render(<Tag closable>Tag</Tag>);
    const closeButton = screen.getByRole('button', { name: '태그 제거' });
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).not.toBeDisabled();
  });

  it('disables close button when tag is disabled', () => {
    render(<Tag closable disabled>Tag</Tag>);
    const closeButton = screen.getByRole('button', { name: '태그 제거' });
    expect(closeButton).toBeDisabled();
  });
}); 