import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select } from '../../components/ui/Select';

const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

const optionsWithDisabled = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2', disabled: true },
  { value: 'option3', label: '옵션 3' },
];

describe('Select', () => {
  it('renders select with placeholder', () => {
    render(<Select options={defaultOptions} placeholder="선택하세요" />);
    expect(screen.getByText('선택하세요')).toBeInTheDocument();
  });

  it('renders select with selected value', () => {
    render(<Select options={defaultOptions} value="option1" />);
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
  });

  it('renders select with multiple selected values', () => {
    render(<Select options={defaultOptions} value={['option1', 'option2']} multiple />);
    expect(screen.getByText('2개 선택됨')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('옵션 3')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.click(trigger);
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    });
  });

  it('selects single option when clicked', () => {
    const handleChange = jest.fn();
    render(<Select options={defaultOptions} onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const option = screen.getByText('옵션 2');
    fireEvent.click(option);
    
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('selects multiple options when multiple is true', () => {
    const handleChange = jest.fn();
    render(<Select options={defaultOptions} multiple onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const option1 = screen.getByText('옵션 1');
    const option2 = screen.getByText('옵션 2');
    
    fireEvent.click(option1);
    fireEvent.click(option2);
    
    expect(handleChange).toHaveBeenCalledWith(['option1']);
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('deselects option when clicked again in multiple mode', () => {
    const handleChange = jest.fn();
    render(
      <Select 
        options={defaultOptions} 
        multiple 
        value={['option1', 'option2']} 
        onChange={handleChange} 
      />
    );
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const option1 = screen.getByText('옵션 1');
    fireEvent.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith(['option2']);
  });

  it('does not select disabled option', () => {
    const handleChange = jest.fn();
    render(<Select options={optionsWithDisabled} onChange={handleChange} />);
    
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const disabledOption = screen.getByText('옵션 2');
    fireEvent.click(disabledOption);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Select options={defaultOptions} size="sm" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--sm');

    rerender(<Select options={defaultOptions} size="md" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--md');

    rerender(<Select options={defaultOptions} size="lg" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Select options={defaultOptions} variant="default" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--default');

    rerender(<Select options={defaultOptions} variant="outlined" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--outlined');

    rerender(<Select options={defaultOptions} variant="filled" />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTrigger--filled');
  });

  it('applies disabled state', () => {
    render(<Select options={defaultOptions} disabled />);
    const trigger = screen.getByRole('combobox');
    
    expect(trigger).toHaveClass('selectTriggerDisabled');
    expect(trigger).toHaveAttribute('tabIndex', '-1');
  });

  it('applies error state', () => {
    render(<Select options={defaultOptions} error />);
    expect(screen.getByRole('combobox')).toHaveClass('selectTriggerError');
  });

  it('renders helper text', () => {
    render(<Select options={defaultOptions} helperText="도움말 텍스트" />);
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('renders error helper text', () => {
    render(<Select options={defaultOptions} error helperText="오류 메시지" />);
    const helperText = screen.getByText('오류 메시지');
    expect(helperText).toHaveClass('selectHelperTextError');
  });

  it('handles keyboard navigation', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    
    // Enter opens dropdown
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    
    // Escape closes dropdown
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    
    // ArrowDown opens dropdown
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    
    // ArrowUp closes dropdown when open
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
  });

  it('does not respond to keyboard when disabled', () => {
    render(<Select options={defaultOptions} disabled />);
    const trigger = screen.getByRole('combobox');
    
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
  });

  it('renders checkboxes in multiple mode', () => {
    render(<Select options={defaultOptions} multiple />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('does not render checkboxes in single mode', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(0);
  });

  it('updates selected values when value prop changes', () => {
    const { rerender } = render(<Select options={defaultOptions} value="option1" />);
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    
    rerender(<Select options={defaultOptions} value="option2" />);
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
  });

  it('updates multiple selected values when value prop changes', () => {
    const { rerender } = render(
      <Select options={defaultOptions} multiple value={['option1']} />
    );
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    
    rerender(<Select options={defaultOptions} multiple value={['option1', 'option2']} />);
    expect(screen.getByText('2개 선택됨')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Select options={defaultOptions} className="custom-select" />);
    expect(screen.getByRole('combobox').closest('.select')).toHaveClass('custom-select');
  });

  it('applies custom style', () => {
    render(<Select options={defaultOptions} style={{ backgroundColor: 'red' }} />);
    const select = screen.getByRole('combobox').closest('.select');
    expect(select).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<Select options={defaultOptions} aria-label="국가 선택" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', '국가 선택');
  });

  it('renders with aria-describedby when helper text is present', () => {
    render(
      <Select 
        options={defaultOptions} 
        aria-label="선택" 
        helperText="도움말" 
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', '선택-helper');
  });

  it('renders listbox with correct attributes', () => {
    render(<Select options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'false');
  });

  it('renders listbox with multiselectable attribute when multiple is true', () => {
    render(<Select options={defaultOptions} multiple />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('renders options with correct attributes', () => {
    render(<Select options={optionsWithDisabled} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    
    const option1 = screen.getByRole('option', { name: '옵션 1' });
    const option2 = screen.getByRole('option', { name: '옵션 2' });
    
    expect(option1).toHaveAttribute('aria-selected', 'false');
    expect(option2).toHaveAttribute('aria-disabled', 'true');
  });
}); 