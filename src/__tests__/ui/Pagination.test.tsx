import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../components/ui/Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination controls', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('이전 페이지')).toBeInTheDocument();
    expect(screen.getByLabelText('다음 페이지')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows current page as active', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when page button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByText('2');
    
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByLabelText('다음 페이지');
    
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when prev button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const prevButton = screen.getByLabelText('이전 페이지');
    
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('disables prev button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText('이전 페이지');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByLabelText('다음 페이지');
    expect(nextButton).toBeDisabled();
  });

  it('does not call onPageChange when clicking current page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const currentPageButton = screen.getByText('1');
    
    fireEvent.click(currentPageButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination {...defaultProps} currentPage={50} totalPages={100} />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('shows total items info when showTotalItems is true', () => {
    render(<Pagination {...defaultProps} showTotalItems />);
    expect(screen.getByText('1-10 / 100 항목')).toBeInTheDocument();
  });

  it('shows page size selector when showPageSizeSelector is true', () => {
    const onPageSizeChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        showPageSizeSelector
        onPageSizeChange={onPageSizeChange}
      />
    );
    
    expect(screen.getByLabelText('페이지당 항목:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('calls onPageSizeChange when page size is changed', () => {
    const onPageSizeChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        showPageSizeSelector
        onPageSizeChange={onPageSizeChange}
      />
    );
    
    const select = screen.getByDisplayValue('10');
    fireEvent.change(select, { target: { value: '20' } });
    
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('disables all controls when disabled is true', () => {
    render(<Pagination {...defaultProps} disabled />);
    
    const prevButton = screen.getByLabelText('이전 페이지');
    const nextButton = screen.getByLabelText('다음 페이지');
    const pageButton = screen.getByText('2');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(pageButton).toBeDisabled();
  });

  it('does not call onPageChange when disabled', () => {
    render(<Pagination {...defaultProps} disabled />);
    const pageButton = screen.getByText('2');
    
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('returns null when totalPages is 1 and no additional features', () => {
    const { container } = render(
      <Pagination
        {...defaultProps}
        totalPages={1}
        showPageSizeSelector={false}
        showTotalItems={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders with custom page size options', () => {
    const onPageSizeChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        pageSize={25}
        pageSizeOptions={[5, 10, 25, 50]}
        showPageSizeSelector
        onPageSizeChange={onPageSizeChange}
      />
    );
    
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  it('calculates correct item range', () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        pageSize={15}
        totalItems={100}
        showTotalItems
      />
    );
    
    expect(screen.getByText('31-45 / 100 항목')).toBeInTheDocument();
  });

  it('handles edge case for last page item range', () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={10}
        pageSize={10}
        totalItems={95}
        showTotalItems
      />
    );
    
    expect(screen.getByText('91-95 / 95 항목')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const prevButton = screen.getByLabelText('이전 페이지');
    const nextButton = screen.getByLabelText('다음 페이지');
    const currentPageButton = screen.getByText('3');
    
    expect(prevButton).toHaveAttribute('aria-label', '이전 페이지');
    expect(nextButton).toHaveAttribute('aria-label', '다음 페이지');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('applies custom className', () => {
    render(<Pagination {...defaultProps} className="custom-class" />);
    expect(screen.getByText('1').closest('.pagination')).toHaveClass('custom-class');
  });

  it('shows correct page numbers for different current pages', () => {
    const { rerender } = render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    rerender(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });
}); 