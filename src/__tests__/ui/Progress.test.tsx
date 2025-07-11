import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from '../../components/ui/Progress';

describe('Progress', () => {
  const defaultProps = {
    value: 50,
  };

  it('renders line progress by default', () => {
    render(<Progress {...defaultProps} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('renders circle progress when type is circle', () => {
    render(<Progress {...defaultProps} type="circle" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.tagName).toBe('circle');
  });

  it('shows label when showLabel is true', () => {
    render(<Progress {...defaultProps} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('shows indeterminate label when value is negative', () => {
    render(<Progress value={-1} showLabel />);
    expect(screen.getByText('진행 중...')).toBeInTheDocument();
  });

  it('calculates percentage correctly with custom max', () => {
    render(<Progress value={5} max={10} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('clamps value between 0 and 100', () => {
    const { rerender } = render(<Progress value={150} showLabel />);
    expect(screen.getByText('100%')).toBeInTheDocument();

    rerender(<Progress value={-50} showLabel />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Progress {...defaultProps} size="sm" />);
    expect(screen.getByRole('progressbar').closest('.progress')).toHaveClass('progress--sm');

    rerender(<Progress {...defaultProps} size="lg" />);
    expect(screen.getByRole('progressbar').closest('.progress')).toHaveClass('progress--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Progress {...defaultProps} variant="success" />);
    expect(screen.getByRole('progressbar')).toHaveClass('progressBar--success');

    rerender(<Progress {...defaultProps} variant="error" />);
    expect(screen.getByRole('progressbar')).toHaveClass('progressBar--error');
  });

  it('applies animated class when animated is true', () => {
    render(<Progress {...defaultProps} animated />);
    expect(screen.getByRole('progressbar')).toHaveClass('progressBarAnimated');
  });

  it('applies striped class when striped is true', () => {
    render(<Progress {...defaultProps} striped />);
    expect(screen.getByRole('progressbar')).toHaveClass('progressBarStriped');
  });

  it('applies custom className', () => {
    render(<Progress {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('progressbar').closest('.progress')).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes for line progress', () => {
    render(<Progress {...defaultProps} />);
    const progressBar = screen.getByRole('progressbar');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', '50% 완료');
  });

  it('has correct accessibility attributes for circle progress', () => {
    render(<Progress {...defaultProps} type="circle" />);
    const progressBar = screen.getByRole('progressbar');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', '50% 완료');
  });

  it('has correct accessibility attributes for indeterminate progress', () => {
    render(<Progress value={-1} />);
    const progressBar = screen.getByRole('progressbar');
    
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
    expect(progressBar).toHaveAttribute('aria-label', '진행 중');
  });

  it('renders label in correct position', () => {
    const { rerender } = render(<Progress {...defaultProps} showLabel labelPosition="top" />);
    expect(screen.getByText('50%')).toHaveClass('progressLabel--top');

    rerender(<Progress {...defaultProps} showLabel labelPosition="bottom" />);
    expect(screen.getByText('50%')).toHaveClass('progressLabel--bottom');
  });

  it('renders inside label for circle progress', () => {
    render(<Progress {...defaultProps} type="circle" showLabel labelPosition="inside" />);
    expect(screen.getByText('50%')).toHaveClass('progressLabel--inside');
  });

  it('handles all variant types', () => {
    const variants = ['primary', 'success', 'warning', 'error', 'info'] as const;
    
    variants.forEach(variant => {
      const { unmount } = render(<Progress {...defaultProps} variant={variant} />);
      expect(screen.getByRole('progressbar')).toHaveClass(`progressBar--${variant}`);
      unmount();
    });
  });

  it('handles all size types', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const { unmount } = render(<Progress {...defaultProps} size={size} />);
      expect(screen.getByRole('progressbar').closest('.progress')).toHaveClass(`progress--${size}`);
      unmount();
    });
  });

  it('renders circle with correct dimensions', () => {
    render(<Progress {...defaultProps} type="circle" size="md" />);
    const svg = screen.getByRole('progressbar').closest('svg');
    expect(svg).toHaveAttribute('width', '85'); // 40 * 2 + 5
    expect(svg).toHaveAttribute('height', '85');
  });

  it('renders circle with correct stroke dasharray', () => {
    render(<Progress {...defaultProps} type="circle" size="md" />);
    const progressBar = screen.getByRole('progressbar');
    const circumference = 2 * Math.PI * 40; // radius = 40 for md size
    expect(progressBar).toHaveAttribute('stroke-dasharray', circumference.toString());
  });

  it('calculates correct stroke dashoffset for circle', () => {
    render(<Progress value={25} type="circle" size="md" />);
    const progressBar = screen.getByRole('progressbar');
    const circumference = 2 * Math.PI * 40;
    const expectedOffset = circumference - (25 / 100) * circumference;
    expect(progressBar).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());
  });

  it('handles indeterminate circle progress', () => {
    render(<Progress value={-1} type="circle" size="md" />);
    const progressBar = screen.getByRole('progressbar');
    const circumference = 2 * Math.PI * 40;
    const expectedOffset = circumference * 0.25;
    expect(progressBar).toHaveAttribute('stroke-dashoffset', expectedOffset.toString());
  });
}); 