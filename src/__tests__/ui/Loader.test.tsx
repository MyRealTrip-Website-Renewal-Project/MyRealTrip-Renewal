import { render, screen } from '@testing-library/react';
import { Loader } from '@/components/ui/Loader';

describe('Loader', () => {
  it('기본 렌더링', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('사이즈/컬러 prop 적용', () => {
    render(<Loader size={48} color="#ff0000" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveStyle({ width: '48px', height: '48px', borderColor: '#ff0000' });
  });

  it('접근성 라벨', () => {
    render(<Loader ariaLabel="로딩중입니다" />);
    expect(screen.getByLabelText('로딩중입니다')).toBeInTheDocument();
  });
}); 