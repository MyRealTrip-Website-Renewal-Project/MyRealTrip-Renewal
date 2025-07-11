import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '@/components/ui/Radio';

describe('Radio', () => {
  it('렌더링 및 label 표시', () => {
    render(<Radio checked={false} onChange={() => {}} label="선택" />);
    expect(screen.getByText('선택')).toBeInTheDocument();
  });

  it('체크 동작', () => {
    const handleChange = jest.fn();
    render(<Radio checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('비활성화 상태', () => {
    render(<Radio checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('접근성 라벨', () => {
    render(<Radio checked={false} onChange={() => {}} ariaLabel="테스트라디오" />);
    expect(screen.getByLabelText('테스트라디오')).toBeInTheDocument();
  });
}); 