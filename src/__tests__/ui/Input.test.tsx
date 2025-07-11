import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('렌더링 및 placeholder 표시', () => {
    render(<Input placeholder="입력하세요" />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('입력 동작', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '테스트' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('접근성 라벨', () => {
    render(<Input aria-label="테스트입력" />);
    expect(screen.getByLabelText('테스트입력')).toBeInTheDocument();
  });
}); 