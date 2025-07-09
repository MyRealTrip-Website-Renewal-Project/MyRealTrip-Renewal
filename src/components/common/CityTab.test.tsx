import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../../test/utils/test-utils';
import '@testing-library/jest-dom';
import CityTab, { CityTabProps } from './CityTab';

describe('CityTab', () => {
  const baseProps: CityTabProps = {
    name: '서울',
    selected: false,
    onClick: jest.fn(),
  };

  it('renders city name', () => {
    render(<CityTab {...baseProps} />);
    expect(screen.getByText('서울')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<CityTab {...baseProps} onClick={onClick} />);
    fireEvent.click(screen.getByText('서울'));
    expect(onClick).toHaveBeenCalled();
  });

  it('has correct aria-selected and role', () => {
    render(<CityTab {...baseProps} selected={true} />);
    const button = screen.getByRole('tab');
    expect(button).toHaveAttribute('aria-selected', 'true');
  });
}); 