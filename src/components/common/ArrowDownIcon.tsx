import React from 'react';

const ARROW_DOWN_SRC = 'https://dffoxz5he03rp.cloudfront.net/icons/ic_arrow_down_md_gray_700.svg';
const SEARCH_ICON_SRC = 'https://dffoxz5he03rp.cloudfront.net/icons/ic_search_20x20_gray_500.svg';

interface IconProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function ArrowDownIcon({ size = 20, style, className }: IconProps) {
  return (
    <img
      src={ARROW_DOWN_SRC}
      alt="아래 화살표"
      width={size}
      height={size}
      style={{ verticalAlign: 'middle', ...style }}
      className={className}
      draggable={false}
    />
  );
}

export function SearchIcon({ size = 20, style, className }: IconProps) {
  return (
    <img
      src={SEARCH_ICON_SRC}
      alt="검색"
      width={size}
      height={size}
      style={{ verticalAlign: 'middle', ...style }}
      className={className}
      draggable={false}
    />
  );
}

export default ArrowDownIcon; 