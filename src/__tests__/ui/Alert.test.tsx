import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from '../../components/ui/Alert';

describe('Alert', () => {
  const defaultProps = {
    children: 'Test alert message',
  };

  it('renders alert with default props', () => {
    render(<Alert {...defaultProps} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('renders with correct type class', () => {
    const { rerender } = render(<Alert {...defaultProps} type="info" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--info');

    rerender(<Alert {...defaultProps} type="success" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--success');

    rerender(<Alert {...defaultProps} type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--warning');

    rerender(<Alert {...defaultProps} type="error" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--error');
  });

  it('renders title when provided', () => {
    render(<Alert {...defaultProps} title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders default icon for each type', () => {
    const { rerender } = render(<Alert {...defaultProps} type="info" />);
    expect(screen.getByText('ℹ')).toBeInTheDocument();

    rerender(<Alert {...defaultProps} type="success" />);
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(<Alert {...defaultProps} type="warning" />);
    expect(screen.getByText('⚠')).toBeInTheDocument();

    rerender(<Alert {...defaultProps} type="error" />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<Alert {...defaultProps} icon="🔔" />);
    expect(screen.getByText('🔔')).toBeInTheDocument();
  });

  it('renders close button when closable is true', () => {
    render(<Alert {...defaultProps} closable />);
    expect(screen.getByLabelText('알림 닫기')).toBeInTheDocument();
  });

  it('does not render close button when closable is false', () => {
    render(<Alert {...defaultProps} closable={false} />);
    expect(screen.queryByLabelText('알림 닫기')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Alert {...defaultProps} closable onClose={handleClose} />);
    
    fireEvent.click(screen.getByLabelText('알림 닫기'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders complex content', () => {
    const complexContent = (
      <div>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );

    render(<Alert {...defaultProps} children={complexContent} />);
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Alert {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    render(<Alert {...defaultProps} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders close button with correct accessibility attributes', () => {
    render(<Alert {...defaultProps} closable />);
    const closeButton = screen.getByLabelText('알림 닫기');
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toHaveAttribute('aria-label', '알림 닫기');
  });

  it('handles all alert types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const;
    
    types.forEach(type => {
      const { unmount } = render(<Alert {...defaultProps} type={type} />);
      expect(screen.getByRole('alert')).toHaveClass(`alert--${type}`);
      unmount();
    });
  });

  it('renders without icon when icon is null', () => {
    render(<Alert {...defaultProps} icon={null} />);
    expect(screen.queryByText('ℹ')).not.toBeInTheDocument();
  });

  it('renders with title and message structure', () => {
    render(<Alert {...defaultProps} title="Test Title" />);
    
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('.alertTitle')).toHaveTextContent('Test Title');
    expect(alert.querySelector('.alertMessage')).toHaveTextContent('Test alert message');
  });

  it('renders with icon, title, and message structure', () => {
    render(<Alert {...defaultProps} title="Test Title" />);
    
    const alert = screen.getByRole('alert');
    expect(alert.querySelector('.alertIcon')).toBeInTheDocument();
    expect(alert.querySelector('.alertTitle')).toBeInTheDocument();
    expect(alert.querySelector('.alertMessage')).toBeInTheDocument();
  });

  it('renders close button in correct position', () => {
    render(<Alert {...defaultProps} closable />);
    
    const alert = screen.getByRole('alert');
    const closeButton = screen.getByLabelText('알림 닫기');
    expect(alert.querySelector('.alertContent')).toContainElement(closeButton);
  });
}); 