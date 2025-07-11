import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '@/components/ui/Toast';

describe('Toast', () => {
  it('메시지 표시', () => {
    render(<Toast message="테스트 메시지" />);
    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
  });

  it('닫기 버튼 동작', () => {
    const handleClose = jest.fn();
    render(<Toast message="닫기 테스트" onClose={handleClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('접근성 라벨', () => {
    render(<Toast message="접근성" ariaLabel="테스트토스트" />);
    expect(screen.getByLabelText('테스트토스트')).toBeInTheDocument();
  });
}); 