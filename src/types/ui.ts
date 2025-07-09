import { ReactNode } from 'react';

// 공통 UI 타입들
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type Align = 'left' | 'center' | 'right';
export type Position = 'top' | 'bottom' | 'left' | 'right';

// 기본 컴포넌트 Props 인터페이스
export interface BaseComponentProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  children?: ReactNode;
}

// 폼 관련 타입들
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  validator?: (value: any) => boolean | string;
}

// 옵션 타입
export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: ReactNode;
  count?: number;
}

// 파일 업로드 타입
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  error?: string;
}

// 페이지네이션 타입
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// 테이블 타입
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: keyof T;
  width?: number | string;
  align?: Align;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
}

export interface TableRow<T = any> {
  id: string | number;
  data: T;
  selected?: boolean;
  disabled?: boolean;
}

// 드롭다운 타입
export interface DropdownItem {
  id: string;
  label: string;
  value?: string | number;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

// 탭 타입
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

// 스텝퍼 타입
export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  status: 'pending' | 'active' | 'completed' | 'error';
  disabled?: boolean;
}

// 카드 타입
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  footer?: ReactNode;
  image?: string;
  actions?: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

// 리스트 타입
export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string | ReactNode;
  actions?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

// 게시판 타입
export interface BoardColumn {
  id: string;
  title: string;
  items: BoardItem[];
  maxItems?: number;
}

export interface BoardItem {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
}

// 필터 타입
export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
  disabled?: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range' | 'slider' | 'date-range' | 'search';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  validation?: ValidationRule;
}

export interface FilterValue {
  [sectionId: string]: string | string[] | number | number[] | { min: number; max: number } | null;
}

// 토스트 타입
export interface ToastProps extends BaseComponentProps {
  id: string;
  type: Variant;
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}

// 로더 타입
export interface LoaderProps extends BaseComponentProps {
  size?: Size;
  type?: 'spinner' | 'dots' | 'bars' | 'pulse';
  text?: string;
  overlay?: boolean;
}

// 에러 메시지 타입
export interface ErrorMessageProps extends BaseComponentProps {
  title?: string;
  message: string;
  code?: string;
  retry?: () => void;
  showRetry?: boolean;
}

// 아이콘 타입
export interface IconProps {
  size?: Size;
  color?: string;
  className?: string;
}

// 애니메이션 타입
export interface AnimationProps {
  in?: boolean;
  timeout?: number;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
}

// 반응형 타입
export interface ResponsiveProps {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
}

// 테마 타입
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  divider: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
} 