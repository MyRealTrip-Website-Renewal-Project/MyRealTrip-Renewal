import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from '../../components/ui/Rating';

describe('Rating', () => {
  it('renders rating with default value', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
  });

  it('renders correct number of stars based on max prop', () => {
    render(<Rating value={3} max={10} />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(10);
  });

  it('renders filled stars based on value', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByRole('radio');
    
    // First 3 stars should be filled
    expect(stars[0]).toHaveAttribute('aria-checked', 'true');
    expect(stars[1]).toHaveAttribute('aria-checked', 'true');
    expect(stars[2]).toHaveAttribute('aria-checked', 'true');
    
    // Last 2 stars should not be filled
    expect(stars[3]).toHaveAttribute('aria-checked', 'false');
    expect(stars[4]).toHaveAttribute('aria-checked', 'false');
  });

  it('handles star click', () => {
    const handleChange = jest.fn();
    render(<Rating value={0} onChange={handleChange} />);
    
    const thirdStar = screen.getAllByRole('radio')[2]; // 3rd star
    fireEvent.click(thirdStar);
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles half-star precision', () => {
    const handleChange = jest.fn();
    render(<Rating value={0} onChange={handleChange} precision={0.5} />);
    
    const thirdStar = screen.getAllByRole('radio')[2]; // 3rd star
    fireEvent.click(thirdStar);
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    
    // Enter key
    fireEvent.keyDown(thirdStar, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(3);
    
    // Space key
    fireEvent.keyDown(thirdStar, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles arrow key navigation', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    
    // Right arrow
    fireEvent.keyDown(thirdStar, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(4);
    
    // Left arrow
    fireEvent.keyDown(thirdStar, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('does not respond to keyboard when readOnly', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} readOnly />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.keyDown(thirdStar, { key: 'Enter' });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not respond to keyboard when disabled', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} disabled />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.keyDown(thirdStar, { key: 'Enter' });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not respond to click when readOnly', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} readOnly />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.click(thirdStar);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not respond to click when disabled', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} disabled />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.click(thirdStar);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Rating size="sm" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--sm');

    rerender(<Rating size="md" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--md');

    rerender(<Rating size="lg" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Rating variant="default" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--default');

    rerender(<Rating variant="filled" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--filled');

    rerender(<Rating variant="outlined" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('rating--outlined');
  });

  it('applies readOnly state', () => {
    render(<Rating readOnly />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ratingReadOnly');
  });

  it('applies disabled state', () => {
    render(<Rating disabled />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ratingDisabled');
  });

  it('renders value when showValue is true', () => {
    render(<Rating value={3.5} showValue />);
    expect(screen.getByText('3.5/5')).toBeInTheDocument();
  });

  it('renders value with precision', () => {
    render(<Rating value={3.5} showValue precision={0.5} />);
    expect(screen.getByText('3.5/5')).toBeInTheDocument();
  });

  it('renders value without decimal when precision is 1', () => {
    render(<Rating value={3.5} showValue precision={1} />);
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('renders label when showLabel is true', () => {
    render(<Rating value={3} showLabel />);
    expect(screen.getByText('좋음')).toBeInTheDocument();
  });

  it('renders correct label for different values', () => {
    const { rerender } = render(<Rating value={0} showLabel />);
    expect(screen.getByText('평가 없음')).toBeInTheDocument();

    rerender(<Rating value={1} showLabel />);
    expect(screen.getByText('나쁨')).toBeInTheDocument();

    rerender(<Rating value={5} showLabel />);
    expect(screen.getByText('완벽함')).toBeInTheDocument();
  });

  it('renders half-star label', () => {
    render(<Rating value={3.5} showLabel />);
    expect(screen.getByText('매우 좋음')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Rating className="custom-rating" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-rating');
  });

  it('applies custom style', () => {
    render(<Rating style={{ backgroundColor: 'red' }} />);
    const rating = screen.getByRole('radiogroup');
    expect(rating).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<Rating aria-label="별점 평가" />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', '별점 평가');
  });

  it('renders with aria-describedby when showLabel is true', () => {
    render(
      <Rating 
        aria-label="별점 평가" 
        showLabel 
      />
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-describedby', '별점 평가-label');
  });

  it('renders stars with correct aria-labels', () => {
    render(<Rating />);
    const stars = screen.getAllByRole('radio');
    
    expect(stars[0]).toHaveAttribute('aria-label', '1점 나쁨');
    expect(stars[1]).toHaveAttribute('aria-label', '2점 보통');
    expect(stars[2]).toHaveAttribute('aria-label', '3점 좋음');
    expect(stars[3]).toHaveAttribute('aria-label', '4점 훌륭함');
    expect(stars[4]).toHaveAttribute('aria-label', '5점 완벽함');
  });

  it('renders half-star aria-labels', () => {
    render(<Rating precision={0.5} />);
    const stars = screen.getAllByRole('radio');
    
    expect(stars[0]).toHaveAttribute('aria-label', '1점 나쁨');
    expect(stars[1]).toHaveAttribute('aria-label', '2점 보통');
    expect(stars[2]).toHaveAttribute('aria-label', '3점 좋음');
  });

  it('handles zero value', () => {
    render(<Rating value={0} showLabel />);
    expect(screen.getByText('평가 없음')).toBeInTheDocument();
  });

  it('handles undefined value', () => {
    render(<Rating showLabel />);
    expect(screen.getByText('평가 없음')).toBeInTheDocument();
  });

  it('limits value to max', () => {
    const handleChange = jest.fn();
    render(<Rating value={0} onChange={handleChange} max={3} />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    fireEvent.click(thirdStar);
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('handles precision with arrow keys', () => {
    const handleChange = jest.fn();
    render(<Rating value={3} onChange={handleChange} precision={0.5} />);
    
    const thirdStar = screen.getAllByRole('radio')[2];
    
    // Right arrow with 0.5 precision
    fireEvent.keyDown(thirdStar, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(3.5);
    
    // Left arrow with 0.5 precision
    fireEvent.keyDown(thirdStar, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(2.5);
  });

  it('handles edge cases with arrow keys', () => {
    const handleChange = jest.fn();
    render(<Rating value={0} onChange={handleChange} />);
    
    const firstStar = screen.getAllByRole('radio')[0];
    
    // Left arrow at minimum
    fireEvent.keyDown(firstStar, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(0);
    
    // Right arrow at maximum
    const lastStar = screen.getAllByRole('radio')[4];
    fireEvent.keyDown(lastStar, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(5);
  });
}); 