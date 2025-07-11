import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DatePicker } from '../../components/ui/DatePicker';

describe('DatePicker', () => {
  it('renders datepicker with placeholder', () => {
    render(<DatePicker placeholder="날짜를 선택하세요" />);
    expect(screen.getByText('날짜를 선택하세요')).toBeInTheDocument();
  });

  it('renders datepicker with selected date', () => {
    const testDate = new Date('2024-01-15');
    render(<DatePicker value={testDate} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('opens calendar when clicked', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    
    expect(screen.getByText('2024년 1월')).toBeInTheDocument();
    expect(screen.getByText('일')).toBeInTheDocument();
    expect(screen.getByText('월')).toBeInTheDocument();
  });

  it('closes calendar when clicking outside', async () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    expect(screen.getByText('2024년 1월')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText('2024년 1월')).not.toBeInTheDocument();
    });
  });

  it('selects date when day is clicked', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const day15 = screen.getByText('15');
    fireEvent.click(day15);
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    const selectedDate = handleChange.mock.calls[0][0];
    expect(selectedDate.getDate()).toBe(15);
  });

  it('navigates to previous month', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const prevButton = screen.getByLabelText('이전 달');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('2023년 12월')).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const nextButton = screen.getByLabelText('다음 달');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('2024년 2월')).toBeInTheDocument();
  });

  it('disables dates outside min/max range', () => {
    const minDate = new Date('2024-01-15');
    const maxDate = new Date('2024-01-20');
    render(<DatePicker minDate={minDate} maxDate={maxDate} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const day10 = screen.getByText('10');
    const day25 = screen.getByText('25');
    
    expect(day10).toBeDisabled();
    expect(day25).toBeDisabled();
  });

  it('does not select disabled dates', () => {
    const handleChange = jest.fn();
    const minDate = new Date('2024-01-15');
    render(<DatePicker minDate={minDate} onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const day10 = screen.getByText('10');
    fireEvent.click(day10);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<DatePicker size="sm" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--sm');

    rerender(<DatePicker size="md" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--md');

    rerender(<DatePicker size="lg" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<DatePicker variant="default" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--default');

    rerender(<DatePicker variant="outlined" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--outlined');

    rerender(<DatePicker variant="filled" />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTrigger--filled');
  });

  it('applies disabled state', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByRole('combobox');
    
    expect(trigger).toHaveClass('datePickerTriggerDisabled');
    expect(trigger).toHaveAttribute('tabIndex', '-1');
  });

  it('applies error state', () => {
    render(<DatePicker error />);
    expect(screen.getByRole('combobox')).toHaveClass('datePickerTriggerError');
  });

  it('renders helper text', () => {
    render(<DatePicker helperText="도움말 텍스트" />);
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('renders error helper text', () => {
    render(<DatePicker error helperText="오류 메시지" />);
    const helperText = screen.getByText('오류 메시지');
    expect(helperText).toHaveClass('datePickerHelperTextError');
  });

  it('handles keyboard navigation', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    
    // Enter opens calendar
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText('2024년 1월')).toBeInTheDocument();
    
    // Escape closes calendar
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('2024년 1월')).not.toBeInTheDocument();
    
    // Space opens calendar
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByText('2024년 1월')).toBeInTheDocument();
  });

  it('does not respond to keyboard when disabled', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.queryByText('2024년 1월')).not.toBeInTheDocument();
  });

  it('clears selected date when clear button is clicked', () => {
    const handleChange = jest.fn();
    const testDate = new Date('2024-01-15');
    render(<DatePicker value={testDate} onChange={handleChange} />);
    
    const clearButton = screen.getByLabelText('날짜 지우기');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('formats date correctly', () => {
    const testDate = new Date('2024-01-15');
    render(<DatePicker value={testDate} format="YYYY년 MM월 DD일" />);
    expect(screen.getByText('2024년 01월 15일')).toBeInTheDocument();
  });

  it('highlights today\'s date', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const today = new Date().getDate();
    const todayElement = screen.getByText(String(today));
    expect(todayElement).toHaveClass('calendarDayToday');
  });

  it('highlights selected date', () => {
    const testDate = new Date('2024-01-15');
    render(<DatePicker value={testDate} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const selectedDay = screen.getByText('15');
    expect(selectedDay).toHaveClass('calendarDaySelected');
  });

  it('updates selected date when value prop changes', () => {
    const { rerender } = render(<DatePicker value={new Date('2024-01-15')} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    
    rerender(<DatePicker value={new Date('2024-02-20')} />);
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DatePicker className="custom-datepicker" />);
    expect(screen.getByRole('combobox').closest('.datePicker')).toHaveClass('custom-datepicker');
  });

  it('applies custom style', () => {
    render(<DatePicker style={{ backgroundColor: 'red' }} />);
    const datePicker = screen.getByRole('combobox').closest('.datePicker');
    expect(datePicker).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<DatePicker aria-label="생년월일 선택" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', '생년월일 선택');
  });

  it('renders with aria-describedby when helper text is present', () => {
    render(
      <DatePicker 
        aria-label="날짜 선택" 
        helperText="도움말" 
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', '날짜 선택-helper');
  });

  it('renders calendar with correct structure', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.getByText('2024년 1월')).toBeInTheDocument();
    expect(screen.getByText('일')).toBeInTheDocument();
    expect(screen.getByText('월')).toBeInTheDocument();
    expect(screen.getByText('화')).toBeInTheDocument();
    expect(screen.getByText('수')).toBeInTheDocument();
    expect(screen.getByText('목')).toBeInTheDocument();
    expect(screen.getByText('금')).toBeInTheDocument();
    expect(screen.getByText('토')).toBeInTheDocument();
  });

  it('renders navigation buttons with correct labels', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    expect(screen.getByLabelText('이전 달')).toBeInTheDocument();
    expect(screen.getByLabelText('다음 달')).toBeInTheDocument();
  });
}); 