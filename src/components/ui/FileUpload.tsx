import React, { useState, useRef, useCallback } from 'react';
import styles from '@/styles/ui/FileUpload.module.scss';

export interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // MB 단위
  maxFiles?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export interface FileInfo {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  multiple = false,
  accept,
  maxSize,
  maxFiles = 10,
  disabled = false,
  size = 'md',
  variant = 'default',
  error = false,
  helperText,
  placeholder = '파일을 선택하거나 여기에 드래그하세요',
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `파일 크기는 ${maxSize}MB 이하여야 합니다.`;
    }
    
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const fileType = file.type;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase();
        }
        return fileType === type || fileType.startsWith(type.replace('*', ''));
      });
      
      if (!isAccepted) {
        return `지원하지 않는 파일 형식입니다. (${accept})`;
      }
    }
    
    return null;
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newFileInfos: FileInfo[] = validFiles.map(file => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        status: 'pending',
      }));

      const updatedFiles = multiple 
        ? [...selectedFiles, ...newFileInfos].slice(0, maxFiles)
        : newFileInfos;

      setSelectedFiles(updatedFiles);
      onFileSelect?.(validFiles);
    }
  }, [multiple, maxFiles, selectedFiles, onFileSelect, accept, maxSize]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (!disabled) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const removeFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAcceptDescription = (): string => {
    if (!accept) return '모든 파일';
    
    const descriptions: { [key: string]: string } = {
      'image/*': '이미지 파일',
      'video/*': '비디오 파일',
      'audio/*': '오디오 파일',
      'application/pdf': 'PDF 파일',
      '.doc,.docx': 'Word 문서',
      '.xls,.xlsx': 'Excel 파일',
      '.ppt,.pptx': 'PowerPoint 파일',
      '.txt': '텍스트 파일',
    };

    return descriptions[accept] || `${accept} 파일`;
  };

  const fileUploadClasses = [
    styles.fileUpload,
    styles[`fileUpload--${size}`],
    styles[`fileUpload--${variant}`],
    isDragOver && styles.fileUploadDragOver,
    disabled && styles.fileUploadDisabled,
    error && styles.fileUploadError,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.fileUploadContainer}>
      <div className={fileUploadClasses} style={style}>
        <div
          className={styles.fileUploadArea}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label={ariaLabel}
          aria-describedby={helperText ? `${ariaLabel}-helper` : undefined}
        >
          <div className={styles.fileUploadContent}>
            <div className={styles.fileUploadIcon}>📁</div>
            <div className={styles.fileUploadText}>
              <div className={styles.fileUploadTitle}>{placeholder}</div>
              <div className={styles.fileUploadSubtitle}>
                {getAcceptDescription()} • 최대 {maxSize ? `${maxSize}MB` : '제한 없음'}
                {multiple && maxFiles > 1 && ` • 최대 ${maxFiles}개 파일`}
              </div>
            </div>
            <button
              type="button"
              className={styles.fileUploadButton}
              disabled={disabled}
            >
              파일 선택
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className={styles.fileUploadInput}
          disabled={disabled}
        />

        {selectedFiles.length > 0 && (
          <div className={styles.fileList}>
            {selectedFiles.map((fileInfo) => (
              <div key={fileInfo.id} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{fileInfo.file.name}</div>
                  <div className={styles.fileDetails}>
                    {formatFileSize(fileInfo.file.size)}
                    {fileInfo.status === 'uploading' && fileInfo.progress !== undefined && (
                      <span className={styles.fileProgress}>
                        • {fileInfo.progress}%
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.fileRemove}
                  onClick={() => removeFile(fileInfo.id)}
                  disabled={disabled}
                  aria-label={`${fileInfo.file.name} 제거`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {helperText && (
        <div 
          id={`${ariaLabel}-helper`}
          className={`${styles.fileUploadHelperText} ${error ? styles.fileUploadHelperTextError : ''}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}; 