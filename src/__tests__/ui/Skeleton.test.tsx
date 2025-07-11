import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText } from '../../components/ui/Skeleton';

describe('Skeleton', () => {
  it('renders skeleton with default props', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton--text');
    expect(skeleton).toHaveClass('skeleton--pulse');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Skeleton variant="text" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--text');

    rerender(<Skeleton variant="circular" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--circular');

    rerender(<Skeleton variant="rectangular" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--rectangular');
  });

  it('applies correct animation classes', () => {
    const { rerender } = render(<Skeleton animation="pulse" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--pulse');

    rerender(<Skeleton animation="wave" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--wave');

    rerender(<Skeleton animation="none" />);
    expect(screen.getByRole('generic')).toHaveClass('skeleton--none');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width="200px" height="100px" />);
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton" />);
    expect(screen.getByRole('generic')).toHaveClass('custom-skeleton');
  });

  it('applies custom style', () => {
    render(<Skeleton style={{ backgroundColor: 'red' }} />);
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toHaveStyle({ backgroundColor: 'red' });
  });

  it('combines multiple props correctly', () => {
    render(
      <Skeleton 
        variant="circular" 
        animation="wave" 
        width={50} 
        height={50}
        className="custom-class"
      />
    );
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toHaveClass(
      'skeleton--circular',
      'skeleton--wave',
      'custom-class'
    );
    expect(skeleton).toHaveStyle({ width: 50, height: 50 });
  });
});

describe('SkeletonText', () => {
  it('renders single line by default', () => {
    render(<SkeletonText />);
    const container = screen.getByRole('generic');
    expect(container).toHaveClass('skeletonText');
    expect(container.children).toHaveLength(1);
  });

  it('renders multiple lines', () => {
    render(<SkeletonText lines={3} />);
    const container = screen.getByRole('generic');
    expect(container.children).toHaveLength(3);
  });

  it('applies custom width to last line', () => {
    render(<SkeletonText lines={2} width="80%" />);
    const lines = screen.getAllByRole('generic');
    const lastLine = lines[lines.length - 1];
    expect(lastLine).toHaveStyle({ width: '80%' });
  });

  it('applies custom height to all lines', () => {
    render(<SkeletonText lines={2} height="20px" />);
    const lines = screen.getAllByRole('generic');
    lines.forEach(line => {
      expect(line).toHaveStyle({ height: '20px' });
    });
  });

  it('applies custom animation to all lines', () => {
    render(<SkeletonText lines={2} animation="wave" />);
    const lines = screen.getAllByRole('generic');
    lines.forEach(line => {
      expect(line).toHaveClass('skeleton--wave');
    });
  });

  it('applies custom className', () => {
    render(<SkeletonText className="custom-text-skeleton" />);
    expect(screen.getByRole('generic')).toHaveClass('custom-text-skeleton');
  });

  it('applies custom style', () => {
    render(<SkeletonText style={{ marginTop: '20px' }} />);
    const container = screen.getByRole('generic');
    expect(container).toHaveStyle({ marginTop: '20px' });
  });

  it('renders with all custom props', () => {
    render(
      <SkeletonText 
        lines={4} 
        width="70%" 
        height="18px" 
        animation="pulse"
        className="custom-class"
        style={{ padding: '10px' }}
      />
    );
    const container = screen.getByRole('generic');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveStyle({ padding: '10px' });
    expect(container.children).toHaveLength(4);
  });
});

describe('Skeleton Integration', () => {
  it('renders multiple skeleton components', () => {
    render(
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circular" />
        <Skeleton variant="rectangular" />
      </div>
    );
    
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons).toHaveLength(3);
  });

  it('renders skeleton text with different animations', () => {
    render(
      <div>
        <SkeletonText animation="pulse" />
        <SkeletonText animation="wave" />
        <SkeletonText animation="none" />
      </div>
    );
    
    const containers = screen.getAllByRole('generic');
    expect(containers).toHaveLength(3);
  });
}); 