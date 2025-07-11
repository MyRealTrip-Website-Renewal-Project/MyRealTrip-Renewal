import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '@/components/ui/Dropdown';

describe('Dropdown', () => {
  const options = [
    { label: '옵션1', value: '1' },
    { label: '옵션2', value: '2' },
  ];

  it('렌더링 및 placeholder 표시', () => {
    render(<Dropdown options={options} placeholder="선택하세요" />);
    expect(screen.getByText('선택하세요')).toBeInTheDocument();
  });

  it('옵션 선택 동작', () => {
    const handleChange = jest.fn();
    render(<Dropdown options={options} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('접근성 라벨', () => {
    render(<Dropdown options={options} ariaLabel="테스트드롭다운" />);
    expect(screen.getByLabelText('테스트드롭다운')).toBeInTheDocument();
  });
}); 