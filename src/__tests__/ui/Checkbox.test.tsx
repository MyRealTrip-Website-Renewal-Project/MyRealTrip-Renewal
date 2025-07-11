import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  it('렌더링 및 label 표시', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="동의" />);
    expect(screen.getByText('동의')).toBeInTheDocument();
  });

  it('체크/언체크 동작', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('비활성화 상태', () => {
    render(<Checkbox checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('접근성 라벨', () => {
    render(<Checkbox checked={false} onChange={() => {}} ariaLabel="테스트체크박스" />);
    expect(screen.getByLabelText('테스트체크박스')).toBeInTheDocument();
  });
}); 