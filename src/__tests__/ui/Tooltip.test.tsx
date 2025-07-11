import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from '../../components/ui/Tooltip';

describe('Tooltip', () => {
  const defaultProps = {
    content: 'Test tooltip content',
    children: <button>Hover me</button>,
  };

  beforeEach(() => {
    // ResizeObserver 모킹
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('renders children correctly', () => {
    render(<Tooltip {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', async () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
    });
  });

  it('hides tooltip on mouse leave', async () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip on focus', async () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.focus(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on blur', async () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.focus(trigger);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    fireEvent.blur(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('respects delay prop', async () => {
    jest.useFakeTimers();
    render(<Tooltip {...defaultProps} delay={500} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    // 지연 시간 전에는 툴팁이 표시되지 않음
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    // 지연 시간 후에 툴팁이 표시됨
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('does not show tooltip when disabled', async () => {
    render(<Tooltip {...defaultProps} disabled />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('applies correct position class', async () => {
    render(<Tooltip {...defaultProps} position="bottom" />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('tooltip--bottom');
    });
  });

  it('handles long content correctly', async () => {
    const longContent = 'This is a very long tooltip content that should be handled properly by the component';
    render(<Tooltip content={longContent} children={<button>Long content</button>} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  it('has correct accessibility attributes', async () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('role', 'tooltip');
      expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    });
  });

  it('cleans up timeouts on unmount', () => {
    jest.useFakeTimers();
    const { unmount } = render(<Tooltip {...defaultProps} delay={500} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.mouseEnter(trigger);
    unmount();
    
    // 컴포넌트가 언마운트된 후에도 타이머가 정리되어야 함
    expect(() => jest.advanceTimersByTime(500)).not.toThrow();
    
    jest.useRealTimers();
  });

  it('applies custom className', () => {
    render(<Tooltip {...defaultProps} className="custom-class" />);
    const trigger = screen.getByRole('button').parentElement;
    expect(trigger).toHaveClass('custom-class');
  });
}); 