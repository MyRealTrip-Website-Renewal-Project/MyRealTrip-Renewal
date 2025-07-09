import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
    expect(input).toHaveClass('input--md');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('input--sm');

    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('input--lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" placeholder="Outline" />);
    expect(screen.getByPlaceholderText('Outline')).toHaveClass('input--outline');

    rerender(<Input variant="filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveClass('input--filled');
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'new value' })
    }));
  });

  it('displays label when provided', () => {
    render(<Input label="Email" placeholder="Enter email" />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Email" required placeholder="Enter email" />);
    
    const label = screen.getByText('Email');
    expect(label).toHaveTextContent('*');
  });

  it('displays error message when error is provided', () => {
    render(<Input error="This field is required" placeholder="Test" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test')).toHaveClass('input--error');
  });

  it('displays helper text', () => {
    render(<Input helperText="This is helper text" placeholder="Test" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders with left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
    const RightIcon = () => <span data-testid="right-icon">📧</span>;
    
    render(
      <Input 
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
        placeholder="With icons"
      />
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With icons')).toHaveClass('input--with-left-icon');
    expect(screen.getByPlaceholderText('With icons')).toHaveClass('input--with-right-icon');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input 
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Test"
      />
    );
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(<Input disabled onChange={handleChange} placeholder="Disabled" />);
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('input--disabled');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref input" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number');
  });

  it('handles controlled value', () => {
    render(<Input value="controlled value" onChange={() => {}} placeholder="Controlled" />);
    expect(screen.getByPlaceholderText('Controlled')).toHaveValue('controlled value');
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    
    render(
      <Input 
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Keyboard"
      />
    );
    
    const input = screen.getByPlaceholderText('Keyboard');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(
      <Input 
        aria-label="Custom input"
        aria-describedby="description"
        aria-required="true"
        placeholder="Accessible"
      />
    );
    
    const input = screen.getByPlaceholderText('Accessible');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
    expect(input).toHaveAttribute('aria-describedby', 'description');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('handles maxLength attribute', () => {
    render(<Input maxLength={10} placeholder="Limited" />);
    expect(screen.getByPlaceholderText('Limited')).toHaveAttribute('maxLength', '10');
  });

  it('handles autoComplete attribute', () => {
    render(<Input autoComplete="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('autoComplete', 'email');
  });
}); 