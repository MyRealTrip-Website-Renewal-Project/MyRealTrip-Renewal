export const theme = {
  colors: {
    primary: '#2196f3',
    primaryDark: '#1976d2',
    secondary: '#2d3a8c',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#e53935',
    info: '#2196f3',
    
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f7f8fa',
    backgroundTertiary: '#f0f0f0',
    
    // Text colors
    textPrimary: '#232f3e',
    textSecondary: '#666666',
    textTertiary: '#bdbdbd',
    textInverse: '#ffffff',
    
    // Border colors
    border: '#ececec',
    borderLight: '#f0f0f0',
    
    // Badge colors
    badge1: '#4caf50',
    badge2: '#ff9800',
    badge3: '#9c27b0',
    
    // Shadow colors
    shadow: 'rgba(0,0,0,0.08)',
    shadowHover: 'rgba(0,0,0,0.13)',
    shadowPrimary: 'rgba(33,150,243,0.08)',
  },
  
  typography: {
    fontFamily: {
      primary: "'Pretendard-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 8px rgba(0,0,0,0.06)',
    lg: '0 4px 20px rgba(0,0,0,0.13)',
    xl: '0 10px 25px rgba(0,0,0,0.15)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type Theme = typeof theme;
export type ColorKey = keyof typeof theme.colors;
export type FontSizeKey = keyof typeof theme.typography.fontSize;
export type SpacingKey = keyof typeof theme.spacing; 