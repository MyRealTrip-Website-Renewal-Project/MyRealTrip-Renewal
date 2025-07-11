import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: '홈', href: '/' },
    { label: '제품', href: '/products' },
    { label: '전자제품', href: '/products/electronics' },
    { label: '스마트폰' },
  ];

  it('renders breadcrumb with items', () => {
    render(<Breadcrumb items={defaultItems} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('제품')).toBeInTheDocument();
    expect(screen.getByText('전자제품')).toBeInTheDocument();
    expect(screen.getByText('스마트폰')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={defaultItems} />);
    const homeLink = screen.getByText('홈');
    const productLink = screen.getByText('제품');
    
    expect(homeLink.tagName).toBe('A');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productLink.tagName).toBe('A');
    expect(productLink).toHaveAttribute('href', '/products');
  });

  it('renders buttons for items with onClick', () => {
    const itemsWithOnClick = [
      { label: '홈', onClick: jest.fn() },
      { label: '제품', onClick: jest.fn() },
      { label: '전자제품' },
    ];
    
    render(<Breadcrumb items={itemsWithOnClick} />);
    const homeButton = screen.getByText('홈');
    const productButton = screen.getByText('제품');
    
    expect(homeButton.tagName).toBe('BUTTON');
    expect(productButton.tagName).toBe('BUTTON');
  });

  it('renders spans for items without href or onClick', () => {
    render(<Breadcrumb items={defaultItems} />);
    const smartphoneSpan = screen.getByText('스마트폰');
    expect(smartphoneSpan.tagName).toBe('SPAN');
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    const itemsWithOnClick = [
      { label: '홈', onClick: handleClick },
      { label: '제품' },
    ];
    
    render(<Breadcrumb items={itemsWithOnClick} />);
    fireEvent.click(screen.getByText('홈'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders separators between items', () => {
    render(<Breadcrumb items={defaultItems} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(3); // 4 items = 3 separators
  });

  it('renders custom separator', () => {
    render(<Breadcrumb items={defaultItems} separator="›" />);
    const separators = screen.getAllByText('›');
    expect(separators).toHaveLength(3);
  });

  it('marks last item as current page', () => {
    render(<Breadcrumb items={defaultItems} />);
    const lastItem = screen.getByText('스마트폰');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  it('limits items when maxItems is provided', () => {
    const manyItems = [
      { label: '홈', href: '/' },
      { label: '제품', href: '/products' },
      { label: '전자제품', href: '/products/electronics' },
      { label: '컴퓨터', href: '/products/electronics/computers' },
      { label: '노트북', href: '/products/electronics/computers/laptops' },
      { label: '게이밍', href: '/products/electronics/computers/laptops/gaming' },
    ];
    
    render(<Breadcrumb items={manyItems} maxItems={4} />);
    
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('컴퓨터')).toBeInTheDocument();
    expect(screen.getByText('노트북')).toBeInTheDocument();
    expect(screen.getByText('게이밍')).toBeInTheDocument();
    
    // First and last items should be visible, middle items should be collapsed
    expect(screen.queryByText('제품')).not.toBeInTheDocument();
    expect(screen.queryByText('전자제품')).not.toBeInTheDocument();
  });

  it('returns null when items array is empty', () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    render(<Breadcrumb items={defaultItems} className="custom-class" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });

  it('uses custom aria-label', () => {
    render(<Breadcrumb items={defaultItems} ariaLabel="Custom breadcrumb" />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Custom breadcrumb');
  });

  it('has correct accessibility structure', () => {
    render(<Breadcrumb items={defaultItems} />);
    const nav = screen.getByRole('navigation');
    const list = nav.querySelector('ol');
    
    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(7); // 4 items + 3 separators
  });

  it('renders ellipsis item correctly', () => {
    const manyItems = [
      { label: '홈', href: '/' },
      { label: '제품', href: '/products' },
      { label: '전자제품', href: '/products/electronics' },
      { label: '컴퓨터', href: '/products/electronics/computers' },
    ];
    
    render(<Breadcrumb items={manyItems} maxItems={3} />);
    const ellipsis = screen.getByText('...');
    expect(ellipsis).toBeInTheDocument();
    expect(ellipsis.tagName).toBe('SPAN');
  });

  it('handles mixed item types correctly', () => {
    const mixedItems = [
      { label: '홈', href: '/' },
      { label: '제품', onClick: jest.fn() },
      { label: '전자제품' },
    ];
    
    render(<Breadcrumb items={mixedItems} />);
    
    expect(screen.getByText('홈').tagName).toBe('A');
    expect(screen.getByText('제품').tagName).toBe('BUTTON');
    expect(screen.getByText('전자제품').tagName).toBe('SPAN');
  });

  it('renders single item correctly', () => {
    const singleItem = [{ label: '홈' }];
    render(<Breadcrumb items={singleItem} />);
    
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.queryByText('/')).not.toBeInTheDocument(); // No separator for single item
  });

  it('handles React node separator', () => {
    render(<Breadcrumb items={defaultItems} separator={<span>→</span>} />);
    const separators = screen.getAllByText('→');
    expect(separators).toHaveLength(3);
  });
}); 