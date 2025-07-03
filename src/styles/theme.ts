export interface ThemeType {
  color: {
    primary: string;
    white: string;
    gray: string;
    text: string;
    placeholder: string;
  };
  borderRadius: string;
}

export const theme: ThemeType = {
  color: {
    primary: '#3478f6',
    white: '#fff',
    gray: '#f7f8fa',
    text: '#232f3e',
    placeholder: '#bdbdbd',
  },
  borderRadius: '8px',
}; 