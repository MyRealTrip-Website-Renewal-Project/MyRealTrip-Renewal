import React from 'react';
import { render, screen } from '@testing-library/react';

test('기본 렌더링 테스트', () => {
  render(<div>hello world</div>);
  expect(screen.getByText('hello world')).toBeInTheDocument();
}); 