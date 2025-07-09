import React, { useRef, useState } from 'react';
import styles from './FileUploader.module.scss';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';

interface FileUploaderProps {
  multiple?: boolean;
  accept?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  multiple = false,
  accept,
  value = [],
  onChange,
  disabled,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    if (onChange) onChange(multiple ? [...value, ...arr] : [arr[0]]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (idx: number) => {
    if (onChange) onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className={clsx(styles.uploaderWrapper, className)}>
      <label
        className={clsx(styles.dropArea, { [styles.dragActive]: dragActive, [styles.disabled]: disabled })}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); !disabled && setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          className={styles.input}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={e => handleFiles(e.target.files)}
        />
        <span>{disabled ? '업로드 불가' : '클릭 또는 드래그하여 파일 업로드'}</span>
      </label>
      {value.length > 0 && (
        <div className={styles.preview}>
          {value.map((file, i) => {
            const isImg = file.type.startsWith('image/');
            const url = isImg ? URL.createObjectURL(file) : undefined;
            return (
              <div className={styles.fileItem} key={file.name + i}>
                {isImg ? (
                  <img src={url} alt={file.name} className={styles.thumb} onLoad={() => URL.revokeObjectURL(url!)} />
                ) : (
                  <div className={styles.thumb} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    📄
                  </div>
                )}
                <div className={styles.fileName}>{file.name}</div>
                <button className={styles.removeBtn} type="button" onClick={() => handleRemove(i)} aria-label="파일 삭제">
                  <MdClose />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}; 