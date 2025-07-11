import { render, screen } from '@testing-library/react';
import { Modal } from '@/components/ui/Modal';

describe('Modal', () => {
  it('열림 상태에서 children 표시', () => {
    render(<Modal open>내용</Modal>);
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('닫힘 상태에서 children 미표시', () => {
    render(<Modal open={false}>숨김</Modal>);
    expect(screen.queryByText('숨김')).toBeNull();
  });

  it('접근성 라벨', () => {
    render(<Modal open aria-label="테스트모달">모달</Modal>);
    expect(screen.getByLabelText('테스트모달')).toBeInTheDocument();
  });
}); 