import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../test/utils/test-utils';
import '@testing-library/jest-dom';
import Badge, { BadgeProps } from './Badge';

describe('Badge', () => {
  const props: BadgeProps = {
    icon: <span role="img" aria-label="최저가">💰</span>,
    text: '최저가 보장',
  };

  it('renders icon and text', () => {
    render(<Badge {...props} />);
    expect(screen.getByLabelText('최저가')).toBeInTheDocument();
    expect(screen.getByText('최저가 보장')).toBeInTheDocument();
  });

  it('has correct role and aria-label', () => {
    render(<Badge {...props} />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', '최저가 보장');
  });
}); 