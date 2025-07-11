import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../../components/ui/Avatar';

describe('Avatar', () => {
  const defaultProps = {
    alt: 'Test Avatar',
  };

  it('renders with initials when no image is provided', () => {
    render(<Avatar {...defaultProps} initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with first letter of alt text when no initials provided', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders with fallback character when no alt or initials', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    const src = 'https://example.com/avatar.jpg';
    render(<Avatar {...defaultProps} src={src} />);
    const image = screen.getByAltText('Test Avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
  });

  it('shows initials when image fails to load', () => {
    render(<Avatar {...defaultProps} src="invalid-url" initials="FB" />);
    const image = screen.getByAltText('Test Avatar');
    
    fireEvent.error(image);
    
    expect(screen.getByText('FB')).toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Avatar {...defaultProps} size="xs" />);
    expect(screen.getByText('T').parentElement).toHaveClass('avatar--xs');

    rerender(<Avatar {...defaultProps} size="lg" />);
    expect(screen.getByText('T').parentElement).toHaveClass('avatar--lg');
  });

  it('applies correct shape classes', () => {
    const { rerender } = render(<Avatar {...defaultProps} shape="circle" />);
    expect(screen.getByText('T').parentElement).toHaveClass('avatar--circle');

    rerender(<Avatar {...defaultProps} shape="square" />);
    expect(screen.getByText('T').parentElement).toHaveClass('avatar--square');
  });

  it('renders status indicator when status is provided', () => {
    render(<Avatar {...defaultProps} status="online" />);
    const statusIndicator = screen.getByText('T').parentElement?.querySelector('.avatarStatus');
    expect(statusIndicator).toBeInTheDocument();
    expect(statusIndicator).toHaveClass('avatarStatus--online');
  });

  it('applies clickable class when onClick is provided', () => {
    render(<Avatar {...defaultProps} onClick={() => {}} />);
    expect(screen.getByText('T').parentElement).toHaveClass('avatarClickable');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Avatar {...defaultProps} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('T').parentElement!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Avatar {...defaultProps} className="custom-class" />);
    expect(screen.getByText('T').parentElement).toHaveClass('custom-class');
  });

  it('handles image load successfully', () => {
    render(<Avatar {...defaultProps} src="https://example.com/avatar.jpg" initials="FB" />);
    const image = screen.getByAltText('Test Avatar');
    
    // 이미지가 로드되기 전에는 이니셜이 보임
    expect(screen.getByText('FB')).toBeInTheDocument();
    
    fireEvent.load(image);
    
    // 이미지가 로드된 후에는 이니셜이 숨겨짐
    expect(screen.queryByText('FB')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Avatar {...defaultProps} src="https://example.com/avatar.jpg" />);
    const image = screen.getByAltText('Test Avatar');
    expect(image).toHaveAttribute('alt', 'Test Avatar');
  });

  it('renders status indicators for all status types', () => {
    const statuses = ['online', 'offline', 'away', 'busy'] as const;
    
    statuses.forEach(status => {
      const { unmount } = render(<Avatar {...defaultProps} status={status} />);
      const statusIndicator = screen.getByText('T').parentElement?.querySelector('.avatarStatus');
      expect(statusIndicator).toHaveClass(`avatarStatus--${status}`);
      unmount();
    });
  });

  it('handles multiple size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    sizes.forEach(size => {
      const { unmount } = render(<Avatar {...defaultProps} size={size} />);
      expect(screen.getByText('T').parentElement).toHaveClass(`avatar--${size}`);
      unmount();
    });
  });

  it('prioritizes initials over alt text for display', () => {
    render(<Avatar {...defaultProps} alt="John Doe" initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByText('J')).not.toBeInTheDocument();
  });
}); 