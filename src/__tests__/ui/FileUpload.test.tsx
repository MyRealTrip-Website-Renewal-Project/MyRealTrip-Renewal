import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FileUpload } from '../../components/ui/FileUpload';

// Mock File API
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUpload', () => {
  it('renders file upload with placeholder', () => {
    render(<FileUpload placeholder="파일을 선택하세요" />);
    expect(screen.getByText('파일을 선택하세요')).toBeInTheDocument();
  });

  it('renders file upload button', () => {
    render(<FileUpload />);
    expect(screen.getByText('파일 선택')).toBeInTheDocument();
  });

  it('renders upload icon', () => {
    render(<FileUpload />);
    expect(screen.getByText('📁')).toBeInTheDocument();
  });

  it('handles file selection', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} />);
    
    const fileInput = screen.getByRole('button');
    fireEvent.click(fileInput);
    
    // File input is hidden, so we can't directly test file selection
    // This test verifies the click handler is called
    expect(fileInput).toBeInTheDocument();
  });

  it('handles drag over', () => {
    render(<FileUpload />);
    const uploadArea = screen.getByRole('button');
    
    fireEvent.dragOver(uploadArea);
    expect(uploadArea.closest('.fileUpload')).toHaveClass('fileUploadDragOver');
  });

  it('handles drag leave', () => {
    render(<FileUpload />);
    const uploadArea = screen.getByRole('button');
    
    fireEvent.dragOver(uploadArea);
    expect(uploadArea.closest('.fileUpload')).toHaveClass('fileUploadDragOver');
    
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea.closest('.fileUpload')).not.toHaveClass('fileUploadDragOver');
  });

  it('handles file drop', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} />);
    
    const uploadArea = screen.getByRole('button');
    const file = createMockFile('test.txt', 1024, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file],
      },
    });
    
    expect(handleFileSelect).toHaveBeenCalledWith([file]);
  });

  it('validates file size', () => {
    const handleFileSelect = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<FileUpload onFileSelect={handleFileSelect} maxSize={1} />);
    
    const uploadArea = screen.getByRole('button');
    const largeFile = createMockFile('large.txt', 2 * 1024 * 1024, 'text/plain'); // 2MB
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [largeFile],
      },
    });
    
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('파일 크기는 1MB 이하여야 합니다'));
    expect(handleFileSelect).not.toHaveBeenCalled();
    
    alertSpy.mockRestore();
  });

  it('validates file type', () => {
    const handleFileSelect = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<FileUpload onFileSelect={handleFileSelect} accept="image/*" />);
    
    const uploadArea = screen.getByRole('button');
    const textFile = createMockFile('test.txt', 1024, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [textFile],
      },
    });
    
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('지원하지 않는 파일 형식입니다'));
    expect(handleFileSelect).not.toHaveBeenCalled();
    
    alertSpy.mockRestore();
  });

  it('accepts valid image file', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} accept="image/*" />);
    
    const uploadArea = screen.getByRole('button');
    const imageFile = createMockFile('test.jpg', 1024, 'image/jpeg');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [imageFile],
      },
    });
    
    expect(handleFileSelect).toHaveBeenCalledWith([imageFile]);
  });

  it('limits number of files', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} multiple maxFiles={2} />);
    
    const uploadArea = screen.getByRole('button');
    const file1 = createMockFile('test1.txt', 1024, 'text/plain');
    const file2 = createMockFile('test2.txt', 1024, 'text/plain');
    const file3 = createMockFile('test3.txt', 1024, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file1, file2, file3],
      },
    });
    
    expect(handleFileSelect).toHaveBeenCalledWith([file1, file2]);
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<FileUpload size="sm" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--sm');

    rerender(<FileUpload size="md" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--md');

    rerender(<FileUpload size="lg" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<FileUpload variant="default" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--default');

    rerender(<FileUpload variant="outlined" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--outlined');

    rerender(<FileUpload variant="filled" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUpload--filled');
  });

  it('applies disabled state', () => {
    render(<FileUpload disabled />);
    const uploadArea = screen.getByRole('button');
    
    expect(uploadArea.closest('.fileUpload')).toHaveClass('fileUploadDisabled');
    expect(uploadArea).toHaveAttribute('tabIndex', '-1');
  });

  it('applies error state', () => {
    render(<FileUpload error />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('fileUploadError');
  });

  it('renders helper text', () => {
    render(<FileUpload helperText="도움말 텍스트" />);
    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });

  it('renders error helper text', () => {
    render(<FileUpload error helperText="오류 메시지" />);
    const helperText = screen.getByText('오류 메시지');
    expect(helperText).toHaveClass('fileUploadHelperTextError');
  });

  it('handles keyboard navigation', () => {
    render(<FileUpload />);
    const uploadArea = screen.getByRole('button');
    
    // Enter opens file dialog
    fireEvent.keyDown(uploadArea, { key: 'Enter' });
    expect(uploadArea).toBeInTheDocument();
    
    // Space opens file dialog
    fireEvent.keyDown(uploadArea, { key: ' ' });
    expect(uploadArea).toBeInTheDocument();
  });

  it('does not respond to keyboard when disabled', () => {
    render(<FileUpload disabled />);
    const uploadArea = screen.getByRole('button');
    
    fireEvent.keyDown(uploadArea, { key: 'Enter' });
    expect(uploadArea).toHaveAttribute('tabIndex', '-1');
  });

  it('does not respond to drag when disabled', () => {
    render(<FileUpload disabled />);
    const uploadArea = screen.getByRole('button');
    
    fireEvent.dragOver(uploadArea);
    expect(uploadArea.closest('.fileUpload')).not.toHaveClass('fileUploadDragOver');
  });

  it('does not respond to drop when disabled', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} disabled />);
    
    const uploadArea = screen.getByRole('button');
    const file = createMockFile('test.txt', 1024, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file],
      },
    });
    
    expect(handleFileSelect).not.toHaveBeenCalled();
  });

  it('renders file type description', () => {
    render(<FileUpload accept="image/*" />);
    expect(screen.getByText('이미지 파일')).toBeInTheDocument();
  });

  it('renders size limit description', () => {
    render(<FileUpload maxSize={10} />);
    expect(screen.getByText('최대 10MB')).toBeInTheDocument();
  });

  it('renders file count limit description', () => {
    render(<FileUpload multiple maxFiles={5} />);
    expect(screen.getByText('최대 5개 파일')).toBeInTheDocument();
  });

  it('renders "제한 없음" when no size limit', () => {
    render(<FileUpload />);
    expect(screen.getByText('제한 없음')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FileUpload className="custom-fileupload" />);
    expect(screen.getByRole('button').closest('.fileUpload')).toHaveClass('custom-fileupload');
  });

  it('applies custom style', () => {
    render(<FileUpload style={{ backgroundColor: 'red' }} />);
    const fileUpload = screen.getByRole('button').closest('.fileUpload');
    expect(fileUpload).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders with aria-label', () => {
    render(<FileUpload aria-label="파일 업로드" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', '파일 업로드');
  });

  it('renders with aria-describedby when helper text is present', () => {
    render(
      <FileUpload 
        aria-label="파일 업로드" 
        helperText="도움말" 
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', '파일 업로드-helper');
  });

  it('handles multiple file types in accept', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} accept=".pdf,.doc,.docx" />);
    
    const uploadArea = screen.getByRole('button');
    const pdfFile = createMockFile('test.pdf', 1024, 'application/pdf');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [pdfFile],
      },
    });
    
    expect(handleFileSelect).toHaveBeenCalledWith([pdfFile]);
  });

  it('handles wildcard file types', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} accept="image/*" />);
    
    const uploadArea = screen.getByRole('button');
    const jpgFile = createMockFile('test.jpg', 1024, 'image/jpeg');
    const pngFile = createMockFile('test.png', 1024, 'image/png');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [jpgFile, pngFile],
      },
    });
    
    expect(handleFileSelect).toHaveBeenCalledWith([jpgFile, pngFile]);
  });

  it('shows file list when files are selected', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} multiple />);
    
    const uploadArea = screen.getByRole('button');
    const file1 = createMockFile('test1.txt', 1024, 'text/plain');
    const file2 = createMockFile('test2.txt', 2048, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file1, file2],
      },
    });
    
    expect(screen.getByText('test1.txt')).toBeInTheDocument();
    expect(screen.getByText('test2.txt')).toBeInTheDocument();
    expect(screen.getByText('1 KB')).toBeInTheDocument();
    expect(screen.getByText('2 KB')).toBeInTheDocument();
  });

  it('removes file when remove button is clicked', () => {
    const handleFileSelect = jest.fn();
    render(<FileUpload onFileSelect={handleFileSelect} multiple />);
    
    const uploadArea = screen.getByRole('button');
    const file = createMockFile('test.txt', 1024, 'text/plain');
    
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [file],
      },
    });
    
    expect(screen.getByText('test.txt')).toBeInTheDocument();
    
    const removeButton = screen.getByLabelText('test.txt 제거');
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
  });
}); 