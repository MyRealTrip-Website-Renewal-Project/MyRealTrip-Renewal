import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from '../../components/ui/Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('divider--horizontal');
  });

  it('renders vertical divider', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveClass('divider--vertical');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Divider variant="solid" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--solid');

    rerender(<Divider variant="dashed" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--dashed');

    rerender(<Divider variant="dotted" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--dotted');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Divider size="sm" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--sm');

    rerender(<Divider size="md" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--md');

    rerender(<Divider size="lg" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--lg');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<Divider color="default" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--default');

    rerender(<Divider color="primary" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--primary');

    rerender(<Divider color="secondary" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--secondary');

    rerender(<Divider color="success" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--success');

    rerender(<Divider color="warning" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--warning');

    rerender(<Divider color="error" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('divider--error');
  });

  it('applies custom className', () => {
    render(<Divider className="custom-divider" />);
    expect(screen.getByRole('separator', { hidden: true })).toHaveClass('custom-divider');
  });

  it('applies custom style', () => {
    render(<Divider style={{ backgroundColor: 'red' }} />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders divider with text', () => {
    render(<Divider>또는</Divider>);
    expect(screen.getByText('또는')).toBeInTheDocument();
  });

  it('renders horizontal divider with text', () => {
    render(<Divider orientation="horizontal">또는</Divider>);
    const container = screen.getByText('또는').closest('.dividerWithText');
    expect(container).toHaveClass('dividerWithText--horizontal');
  });

  it('renders vertical divider with text', () => {
    render(<Divider orientation="vertical">또는</Divider>);
    const container = screen.getByText('또는').closest('.dividerWithText');
    expect(container).toHaveClass('dividerWithText--vertical');
  });

  it('renders text with correct styling', () => {
    render(<Divider>구분 텍스트</Divider>);
    const text = screen.getByText('구분 텍스트');
    expect(text).toHaveClass('dividerText');
  });

  it('combines multiple props correctly', () => {
    render(
      <Divider 
        orientation="vertical" 
        variant="dashed" 
        size="lg" 
        color="primary"
        className="custom-class"
      />
    );
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveClass(
      'divider--vertical',
      'divider--dashed',
      'divider--lg',
      'divider--primary',
      'custom-class'
    );
  });

  it('renders multiple dividers with text', () => {
    render(
      <div>
        <Divider>첫 번째 구분</Divider>
        <Divider>두 번째 구분</Divider>
      </div>
    );
    
    expect(screen.getByText('첫 번째 구분')).toBeInTheDocument();
    expect(screen.getByText('두 번째 구분')).toBeInTheDocument();
  });

  it('renders empty divider without text', () => {
    render(<Divider />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('renders divider with complex children', () => {
    render(
      <Divider>
        <span>복잡한</span> <strong>텍스트</strong>
      </Divider>
    );
    expect(screen.getByText('복잡한')).toBeInTheDocument();
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });
}); 