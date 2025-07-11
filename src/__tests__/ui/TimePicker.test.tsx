import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TimePicker } from '../../components/ui/TimePicker';

describe('TimePicker', () => {
  it('renders timepicker with placeholder', () => {
    render(<TimePicker placeholder="시간을 선택하세요" />);
    expect(screen.getByText('시간을 선택하세요')).toBeInTheDocument();
  });

  it('renders timepicker with selected time', () => {
    const testTime = new Date('2024-01-01T14:30:00');
    render(<TimePicker value={testTime} />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('opens time picker when clicked', () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    
    expect(screen.getByText('시간')).toBeInTheDocument();
    expect(screen.getByText('분')).toBeInTheDocument();
  });

  it('closes time picker when clicking outside', async () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    expect(screen.getByText('시간')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText('시간')).not.toBeInTheDocument();
    });
  });

  it('selects time when hour is clicked', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const hour14 = screen.getByText('14');
    fireEvent.click(hour14);
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    const selectedTime = handleChange.mock.calls[0][0];
    expect(selectedTime.getHours()).toBe(14);
  });

  it('selects time when minute is clicked', () => {
    const handleChange = jest.fn();
    render(<TimePicker onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const minute30 = screen.getByText('30');
    fireEvent.click(minute30);
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    const selectedTime = handleChange.mock.calls[0][0];
    expect(selectedTime.getMinutes()).toBe(30);
  });

  it('formats time in 24-hour format', () => {
    const testTime = new Date('2024-01-01T14:30:00');
    render(<TimePicker value={testTime} format="24h" />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('formats time in 12-hour format', () => {
    const testTime = new Date('2024-01-01T14:30:00');
    render(<TimePicker value={testTime} format="12h" />);
    expect(screen.getByText('02:30 PM')).toBeInTheDocument();
  });

  it('shows seconds when showSeconds is true', () => {
    const testTime = new Date('2024-01-01T14:30:45');
    render(<TimePicker value={testTime} showSeconds />);
    expect(screen.getByText('14:30:45')).toBeInTheDocument();
  });

  it('shows seconds in 12-hour format', () => {
    const testTime = new Date('2024-01-01T14:30:45');
    render(<TimePicker value={testTime} format="12h" showSeconds />);
    expect(screen.getByText('02:30:45 PM')).toBeInTheDocument();
  });

  it('generates correct number of hours for 24-hour format', () => {
    render(<TimePicker format="24h" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    // 24시간 형식에서는 0-23시까지 표시
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.queryByText('24')).not.toBeInTheDocument();
  });

  it('generates correct number of hours for 12-hour format', () => {
    render(<TimePicker format="12h" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    // 12시간 형식에서는 1-12시까지 표시
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.queryByText('00')).not.toBeInTheDocument();
    expect(screen.queryByText('13')).not.toBeInTheDocument();
  });

  it('shows AM/PM options in 12-hour format', () => {
    render(<TimePicker format="12h" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('does not show AM/PM options in 24-hour format', () => {
    render(<TimePicker format="24h" />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.queryByText('AM')).not.toBeInTheDocument();
    expect(screen.queryByText('PM')).not.toBeInTheDocument();
  });

  it('generates minutes with custom step', () => {
    render(<TimePicker step={15} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    // 15분 단위로 표시
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.queryByText('01')).not.toBeInTheDocument();
  });

  it('shows seconds section when showSeconds is true', () => {
    render(<TimePicker showSeconds />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.getByText('초')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(screen.getByText('59')).toBeInTheDocument();
  });

  it('does not show seconds section when showSeconds is false', () => {
    render(<TimePicker showSeconds={false} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.queryByText('초')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<TimePicker size="sm" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--sm');

    rerender(<TimePicker size="md" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--md');

    rerender(<TimePicker size="lg" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<TimePicker variant="default" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--default');

    rerender(<TimePicker variant="outlined" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--outlined');

    rerender(<TimePicker variant="filled" />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTrigger--filled');
  });

  it('applies disabled state', () => {
    render(<TimePicker disabled />);
    const trigger = screen.getByRole('combobox');
    
    expect(trigger).toHaveClass('timePickerTriggerDisabled');
    expect(trigger).toHaveAttribute('tabIndex', '-1');
  });

  it('applies error state', () => {
    render(<TimePicker error />);
    expect(screen.getByRole('combobox')).toHaveClass('timePickerTriggerError');
  });

  it('renders helper text', () => {
    render(<TimePicker helperText="도움말 텍스트" />);
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('renders error helper text', () => {
    render(<TimePicker error helperText="오류 메시지" />);
    const helperText = screen.getByText('오류 메시지');
    expect(helperText).toHaveClass('timePickerHelperTextError');
  });

  it('handles keyboard navigation', () => {
    render(<TimePicker />);
    const trigger = screen.getByRole('combobox');
    
    // Enter opens time picker
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText('시간')).toBeInTheDocument();
    
    // Escape closes time picker
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('시간')).not.toBeInTheDocument();
    
    // Space opens time picker
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByText('시간')).toBeInTheDocument();
  });

  it('does not respond to keyboard when disabled', () => {
    render(<TimePicker disabled />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.queryByText('시간')).not.toBeInTheDocument();
  });

  it('clears selected time when clear button is clicked', () => {
    const handleChange = jest.fn();
    const testTime = new Date('2024-01-01T14:30:00');
    render(<TimePicker value={testTime} onChange={handleChange} />);
    
    const clearButton = screen.getByLabelText('시간 지우기');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('updates selected time when value prop changes', () => {
    const { rerender } = render(<TimePicker value={new Date('2024-01-01T14:30:00')} />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
    
    rerender(<TimePicker value={new Date('2024-01-01T15:45:00')} />);
    expect(screen.getByText('15:45')).toBeInTheDocument();
  });

  it('handles null value', () => {
    render(<TimePicker value={null} placeholder="시간을 선택하세요" />);
    expect(screen.getByText('시간을 선택하세요')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TimePicker className="custom-timepicker" />);
    expect(screen.getByRole('combobox').closest('.timePicker')).toHaveClass('custom-timepicker');
  });

  it('applies custom style', () => {
    render(<TimePicker style={{ backgroundColor: 'red' }} />);
    const timePicker = screen.getByRole('combobox').closest('.timePicker');
    expect(timePicker).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<TimePicker aria-label="시간 선택" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', '시간 선택');
  });

  it('renders with aria-describedby when helper text is present', () => {
    render(
      <TimePicker 
        aria-label="시간 선택" 
        helperText="도움말" 
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', '시간 선택-helper');
  });

  it('handles AM/PM selection correctly', () => {
    const handleChange = jest.fn();
    const testTime = new Date('2024-01-01T14:30:00');
    render(<TimePicker value={testTime} format="12h" onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const amButton = screen.getByText('AM');
    fireEvent.click(amButton);
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    const selectedTime = handleChange.mock.calls[0][0];
    expect(selectedTime.getHours()).toBe(2); // 14시를 AM으로 변경하면 2시
  });

  it('handles PM selection correctly', () => {
    const handleChange = jest.fn();
    const testTime = new Date('2024-01-01T02:30:00');
    render(<TimePicker value={testTime} format="12h" onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const pmButton = screen.getByText('PM');
    fireEvent.click(pmButton);
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    const selectedTime = handleChange.mock.calls[0][0];
    expect(selectedTime.getHours()).toBe(14); // 2시를 PM으로 변경하면 14시
  });
}); 