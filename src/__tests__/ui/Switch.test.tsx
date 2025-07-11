import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '@/components/ui/Switch';

describe('Switch', () => {
  it('렌더링 및 label 표시', () => {
    render(<Switch checked={false} onChange={() => {}} label="토글" />);
    expect(screen.getByText('토글')).toBeInTheDocument();
  });

  it('토글 동작', () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('비활성화 상태', () => {
    render(<Switch checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('접근성 라벨', () => {
    render(<Switch checked={false} onChange={() => {}} ariaLabel="테스트스위치" />);
    expect(screen.getByLabelText('테스트스위치')).toBeInTheDocument();
  });
}); 