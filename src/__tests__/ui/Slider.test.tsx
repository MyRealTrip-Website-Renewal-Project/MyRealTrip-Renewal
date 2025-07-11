import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../../components/ui/Slider';

describe('Slider', () => {
  it('renders slider with default value', () => {
    render(<Slider value={50} />);
    const slider = screen.getByRole('group');
    expect(slider).toBeInTheDocument();
  });

  it('renders single thumb for single value', () => {
    render(<Slider value={50} />);
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(1);
  });

  it('renders two thumbs for range value', () => {
    render(<Slider value={[25, 75]} />);
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(2);
  });

  it('renders thumbs with correct aria attributes', () => {
    render(<Slider value={50} min={0} max={100} />);
    const thumb = screen.getByRole('slider');
    
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
    expect(thumb).toHaveAttribute('aria-valuetext', '50');
  });

  it('renders range thumbs with correct aria attributes', () => {
    render(<Slider value={[25, 75]} min={0} max={100} />);
    const thumbs = screen.getAllByRole('slider');
    
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '25');
    expect(thumbs[1]).toHaveAttribute('aria-valuenow', '75');
  });

  it('handles value change on click', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} onChange={handleChange} />);
    
    const slider = screen.getByRole('group');
    fireEvent.click(slider);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    
    // Right arrow
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(51);
    
    // Left arrow
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(49);
    
    // Up arrow
    fireEvent.keyDown(thumb, { key: 'ArrowUp' });
    expect(handleChange).toHaveBeenCalledWith(51);
    
    // Down arrow
    fireEvent.keyDown(thumb, { key: 'ArrowDown' });
    expect(handleChange).toHaveBeenCalledWith(49);
  });

  it('handles Home and End keys', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} min={0} max={100} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    
    // Home key
    fireEvent.keyDown(thumb, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(0);
    
    // End key
    fireEvent.keyDown(thumb, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('respects step value', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} step={5} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    
    expect(handleChange).toHaveBeenCalledWith(55);
  });

  it('respects min and max values', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} min={0} max={100} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    
    // Try to go below min
    fireEvent.keyDown(thumb, { key: 'Home' });
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(0);
    
    // Try to go above max
    fireEvent.keyDown(thumb, { key: 'End' });
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('handles range value changes', () => {
    const handleChange = jest.fn();
    render(<Slider value={[25, 75]} onChange={handleChange} />);
    
    const thumbs = screen.getAllByRole('slider');
    
    // Move first thumb
    fireEvent.keyDown(thumbs[0], { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith([26, 75]);
    
    // Move second thumb
    fireEvent.keyDown(thumbs[1], { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith([26, 74]);
  });

  it('does not respond to keyboard when disabled', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} disabled onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not respond to click when disabled', () => {
    const handleChange = jest.fn();
    render(<Slider value={50} disabled onChange={handleChange} />);
    
    const slider = screen.getByRole('group');
    fireEvent.click(slider);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Slider size="sm" />);
    expect(screen.getByRole('group')).toHaveClass('slider--sm');

    rerender(<Slider size="md" />);
    expect(screen.getByRole('group')).toHaveClass('slider--md');

    rerender(<Slider size="lg" />);
    expect(screen.getByRole('group')).toHaveClass('slider--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Slider variant="default" />);
    expect(screen.getByRole('group')).toHaveClass('slider--default');

    rerender(<Slider variant="filled" />);
    expect(screen.getByRole('group')).toHaveClass('slider--filled');

    rerender(<Slider variant="outlined" />);
    expect(screen.getByRole('group')).toHaveClass('slider--outlined');
  });

  it('applies disabled state', () => {
    render(<Slider disabled />);
    expect(screen.getByRole('group')).toHaveClass('sliderDisabled');
  });

  it('renders value when showValue is true', () => {
    render(<Slider value={50} showValue />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders range value when showValue is true', () => {
    render(<Slider value={[25, 75]} showValue />);
    expect(screen.getByText('25 - 75')).toBeInTheDocument();
  });

  it('renders marks when showMarks is true', () => {
    render(<Slider value={50} showMarks />);
    const marks = document.querySelectorAll('.sliderMark');
    expect(marks.length).toBeGreaterThan(0);
  });

  it('renders custom marks', () => {
    const customMarks = [
      { value: 0, label: '시작' },
      { value: 50, label: '중간' },
      { value: 100, label: '끝' },
    ];
    
    render(<Slider value={50} marks={customMarks} />);
    
    expect(screen.getByText('시작')).toBeInTheDocument();
    expect(screen.getByText('중간')).toBeInTheDocument();
    expect(screen.getByText('끝')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Slider className="custom-slider" />);
    expect(screen.getByRole('group')).toHaveClass('custom-slider');
  });

  it('applies custom style', () => {
    render(<Slider style={{ backgroundColor: 'red' }} />);
    const slider = screen.getByRole('group');
    expect(slider).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<Slider aria-label="값 선택" />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', '값 선택');
  });

  it('renders thumbs with correct aria-labels for single value', () => {
    render(<Slider value={50} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-label', '값 50');
  });

  it('renders thumbs with correct aria-labels for range', () => {
    render(<Slider value={[25, 75]} />);
    const thumbs = screen.getAllByRole('slider');
    
    expect(thumbs[0]).toHaveAttribute('aria-label', '최소값 25');
    expect(thumbs[1]).toHaveAttribute('aria-label', '최대값 75');
  });

  it('handles decimal step values', () => {
    const handleChange = jest.fn();
    render(<Slider value={2.5} step={0.5} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles custom min and max values', () => {
    const handleChange = jest.fn();
    render(<Slider value={5} min={1} max={10} onChange={handleChange} />);
    
    const thumb = screen.getByRole('slider');
    
    // Home key should go to min
    fireEvent.keyDown(thumb, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(1);
    
    // End key should go to max
    fireEvent.keyDown(thumb, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('handles vertical orientation', () => {
    render(<Slider orientation="vertical" />);
    expect(screen.getByRole('group')).toHaveClass('slider--vertical');
  });

  it('handles undefined value', () => {
    render(<Slider />);
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles zero value', () => {
    render(<Slider value={0} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles maximum value', () => {
    render(<Slider value={100} max={100} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles range with equal values', () => {
    render(<Slider value={[50, 50]} />);
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '50');
    expect(thumbs[1]).toHaveAttribute('aria-valuenow', '50');
  });
}); 