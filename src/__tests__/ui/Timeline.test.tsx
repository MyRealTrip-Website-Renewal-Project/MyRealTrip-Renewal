import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '../../components/ui/Timeline';

const defaultItems = [
  {
    title: 'Event 1',
    description: 'First event description',
    date: '2024-01-01',
  },
  {
    title: 'Event 2',
    description: 'Second event description',
    date: '2024-01-15',
  },
  {
    title: 'Event 3',
    description: 'Third event description',
    date: '2024-02-01',
  },
];

describe('Timeline', () => {
  it('renders timeline with items', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
  });

  it('renders item descriptions when provided', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('First event description')).toBeInTheDocument();
    expect(screen.getByText('Second event description')).toBeInTheDocument();
    expect(screen.getByText('Third event description')).toBeInTheDocument();
  });

  it('renders dates when showDates is true', () => {
    render(<Timeline items={defaultItems} showDates />);
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-02-01')).toBeInTheDocument();
  });

  it('does not render dates when showDates is false', () => {
    render(<Timeline items={defaultItems} showDates={false} />);
    expect(screen.queryByText('2024-01-01')).not.toBeInTheDocument();
    expect(screen.queryByText('2024-01-15')).not.toBeInTheDocument();
    expect(screen.queryByText('2024-02-01')).not.toBeInTheDocument();
  });

  it('renders custom icons when provided', () => {
    const itemsWithIcons = [
      { title: 'Event 1', icon: '🚀' },
      { title: 'Event 2', icon: '⭐' },
      { title: 'Event 3', icon: '🎉' },
    ];
    
    render(<Timeline items={itemsWithIcons} />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('renders default icons for different statuses', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'completed' as const },
      { title: 'Event 2', status: 'active' as const },
      { title: 'Event 3', status: 'error' as const },
      { title: 'Event 4', status: 'pending' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    expect(screen.getByText('✓')).toBeInTheDocument(); // completed
    expect(screen.getByText('●')).toBeInTheDocument(); // active
    expect(screen.getByText('✕')).toBeInTheDocument(); // error
    expect(screen.getByText('○')).toBeInTheDocument(); // pending
  });

  it('renders completed status correctly', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'completed' as const },
      { title: 'Event 2', status: 'active' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const completedItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(completedItem).toHaveClass('timelineItem--completed');
  });

  it('renders active status correctly', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'completed' as const },
      { title: 'Event 2', status: 'active' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const activeItem = screen.getByText('Event 2').closest('[role="button"]');
    expect(activeItem).toHaveClass('timelineItem--active');
  });

  it('renders error status correctly', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'error' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const errorItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(errorItem).toHaveClass('timelineItem--error');
  });

  it('handles item click when clickable is true', () => {
    const handleItemClick = jest.fn();
    render(<Timeline items={defaultItems} clickable onItemClick={handleItemClick} />);
    
    const firstItem = screen.getByText('Event 1').closest('[role="button"]');
    fireEvent.click(firstItem!);
    
    expect(handleItemClick).toHaveBeenCalledWith(0);
  });

  it('does not handle item click when clickable is false', () => {
    const handleItemClick = jest.fn();
    render(<Timeline items={defaultItems} onItemClick={handleItemClick} />);
    
    const firstItem = screen.getByText('Event 1').closest('[role="button"]');
    fireEvent.click(firstItem!);
    
    expect(handleItemClick).not.toHaveBeenCalled();
  });

  it('does not handle item click when item is disabled', () => {
    const handleItemClick = jest.fn();
    const itemsWithDisabled = [
      { title: 'Event 1', disabled: true },
      { title: 'Event 2' },
    ];
    
    render(<Timeline items={itemsWithDisabled} clickable onItemClick={handleItemClick} />);
    
    const disabledItem = screen.getByText('Event 1').closest('[role="button"]');
    fireEvent.click(disabledItem!);
    
    expect(handleItemClick).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Timeline items={defaultItems} size="sm" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--sm');

    rerender(<Timeline items={defaultItems} size="md" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--md');

    rerender(<Timeline items={defaultItems} size="lg" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Timeline items={defaultItems} variant="default" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--default');

    rerender(<Timeline items={defaultItems} variant="outlined" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--outlined');

    rerender(<Timeline items={defaultItems} variant="filled" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--filled');
  });

  it('applies correct orientation classes', () => {
    const { rerender } = render(<Timeline items={defaultItems} orientation="vertical" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--vertical');

    rerender(<Timeline items={defaultItems} orientation="horizontal" />);
    expect(screen.getByRole('list')).toHaveClass('timeline--horizontal');
  });

  it('renders with correct aria attributes', () => {
    render(<Timeline items={defaultItems} aria-label="Test timeline" />);
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Test timeline');
  });

  it('renders clickable items with correct role', () => {
    render(<Timeline items={defaultItems} clickable />);
    const items = screen.getAllByRole('button');
    expect(items).toHaveLength(3);
  });

  it('renders non-clickable items without button role', () => {
    render(<Timeline items={defaultItems} />);
    const items = screen.queryAllByRole('button');
    expect(items).toHaveLength(0);
  });

  it('renders disabled items with correct aria attributes', () => {
    const itemsWithDisabled = [
      { title: 'Event 1', disabled: true },
      { title: 'Event 2' },
    ];
    
    render(<Timeline items={itemsWithDisabled} clickable />);
    const disabledItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders items with correct aria-labels', () => {
    render(<Timeline items={defaultItems} />);
    const items = screen.getAllByText(/Event \d/);
    
    items.forEach((item, index) => {
      const itemElement = item.closest('[role="button"]');
      if (itemElement) {
        expect(itemElement).toHaveAttribute('aria-label', `Event ${index + 1}`);
      }
    });
  });

  it('renders completed items with correct aria-label', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'completed' as const },
      { title: 'Event 2', status: 'active' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const completedItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(completedItem).toHaveAttribute('aria-label', 'Event 1 완료');
  });

  it('renders error items with correct aria-label', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'error' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const errorItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(errorItem).toHaveAttribute('aria-label', 'Event 1 오류');
  });

  it('renders active items with correct aria-label', () => {
    const itemsWithStatus = [
      { title: 'Event 1', status: 'active' as const },
    ];
    
    render(<Timeline items={itemsWithStatus} />);
    const activeItem = screen.getByText('Event 1').closest('[role="button"]');
    expect(activeItem).toHaveAttribute('aria-label', 'Event 1 진행 중');
  });

  it('applies custom className', () => {
    render(<Timeline items={defaultItems} className="custom-timeline" />);
    expect(screen.getByRole('list')).toHaveClass('custom-timeline');
  });

  it('applies custom style', () => {
    render(<Timeline items={defaultItems} style={{ backgroundColor: 'red' }} />);
    const timeline = screen.getByRole('list');
    expect(timeline).toHaveStyle({ backgroundColor: 'red' });
  });

  it('handles keyboard navigation for clickable items', () => {
    const handleItemClick = jest.fn();
    render(<Timeline items={defaultItems} clickable onItemClick={handleItemClick} />);
    
    const firstItem = screen.getByText('Event 1').closest('[role="button"]');
    fireEvent.keyDown(firstItem!, { key: 'Enter' });
    
    expect(handleItemClick).toHaveBeenCalledWith(0);
  });

  it('does not handle keyboard navigation for non-clickable items', () => {
    const handleItemClick = jest.fn();
    render(<Timeline items={defaultItems} onItemClick={handleItemClick} />);
    
    const firstItem = screen.getByText('Event 1').closest('[role="button"]');
    if (firstItem) {
      fireEvent.keyDown(firstItem, { key: 'Enter' });
      expect(handleItemClick).not.toHaveBeenCalled();
    }
  });

  it('handles empty items array', () => {
    render(<Timeline items={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('handles single item', () => {
    render(<Timeline items={[{ title: 'Single Event' }]} />);
    expect(screen.getByText('Single Event')).toBeInTheDocument();
  });

  it('handles items without descriptions', () => {
    const itemsWithoutDescriptions = [
      { title: 'Event 1' },
      { title: 'Event 2' },
    ];
    
    render(<Timeline items={itemsWithoutDescriptions} />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('handles items without dates', () => {
    const itemsWithoutDates = [
      { title: 'Event 1', description: 'Description 1' },
      { title: 'Event 2', description: 'Description 2' },
    ];
    
    render(<Timeline items={itemsWithoutDates} showDates />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('renders connectors when showConnectors is true', () => {
    render(<Timeline items={defaultItems} showConnectors />);
    const connectors = document.querySelectorAll('.timelineConnector');
    expect(connectors.length).toBe(2); // 3 items = 2 connectors
  });

  it('does not render connectors when showConnectors is false', () => {
    render(<Timeline items={defaultItems} showConnectors={false} />);
    const connectors = document.querySelectorAll('.timelineConnector');
    expect(connectors.length).toBe(0);
  });
}); 