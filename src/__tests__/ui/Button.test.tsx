import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('렌더링 및 텍스트 표시', () => {
    render(<Button>확인</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('확인');
  });

  it('클릭 이벤트 동작', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('비활성화 상태', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('접근성 라벨', () => {
    render(<Button aria-label="테스트버튼" />);
    expect(screen.getByLabelText('테스트버튼')).toBeInTheDocument();
  });
}); 