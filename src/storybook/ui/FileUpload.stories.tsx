import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadIcon, XIcon, FileIcon, ImageIcon } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/FileUpload',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '파일을 업로드할 수 있는 컴포넌트입니다. 드래그 앤 드롭, 클릭 선택, 다중 파일 업로드를 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      description: '허용할 파일 타입',
      control: 'text'
    },
    multiple: {
      description: '다중 파일 선택 허용',
      control: 'boolean'
    },
    maxSize: {
      description: '최대 파일 크기 (MB)',
      control: 'number'
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 파일 업로드
export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      setFiles(selectedFiles);
    };

    const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            multiple
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              파일을 클릭하거나 드래그하여 업로드하세요
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, PDF 최대 10MB
            </p>
          </label>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">선택된 파일:</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

// 이미지 업로드
export const ImageUpload: Story = {
  render: () => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      setImages(selectedFiles);
      
      // 미리보기 생성
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    };

    const removeImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
      setPreviews(previews.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            multiple
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              이미지를 클릭하거나 드래그하여 업로드하세요
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, GIF 최대 5MB
            </p>
          </label>
        </div>
        
        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

// 드래그 앤 드롭
export const DragAndDrop: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
    };

    return (
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            파일을 여기에 드래그하여 업로드하세요
          </p>
          <p className="text-xs text-gray-500 mt-1">
            또는 클릭하여 파일을 선택하세요
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">업로드된 파일:</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <FileIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

// 단일 파일 업로드
export const SingleFile: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };

    const removeFile = () => {
      setFile(null);
    };

    return (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="single-file-upload"
          />
          <label htmlFor="single-file-upload" className="cursor-pointer">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              파일을 선택하세요
            </p>
            <p className="text-xs text-gray-500 mt-1">
              단일 파일만 업로드 가능
            </p>
          </label>
        </div>
        
        {file && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{file.name}</span>
              <span className="text-xs text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-6 w-6 p-0"
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  }
};

// 비활성화된 파일 업로드
export const Disabled: Story = {
  render: () => (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50">
      <UploadIcon className="mx-auto h-12 w-12 text-gray-300" />
      <p className="mt-2 text-sm text-gray-400">
        파일 업로드가 비활성화되었습니다
      </p>
      <p className="text-xs text-gray-400 mt-1">
        현재 업로드할 수 없습니다
      </p>
    </div>
  )
}; 