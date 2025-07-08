import React from 'react';

export interface SuggestionItemData {
  type: string;
  name: string;
  country?: string;
  detail?: string;
}

interface SuggestionItemProps {
  item: SuggestionItemData;
  getIcon: (type: string) => React.ReactNode;
  className?: string;
  textClassName?: string;
  cityClassName?: string;
  countryClassName?: string;
  onClick?: () => void;
}

export function SuggestionItem({
  item,
  getIcon,
  className = '',
  textClassName = '',
  cityClassName = '',
  countryClassName = '',
  onClick,
}: SuggestionItemProps) {
  return (
    <div className={className} onMouseDown={onClick}>
      {getIcon(item.type)}
      <div className={textClassName}>
        <span className={cityClassName}>{item.name}</span>
        {item.detail ? (
          <span className={countryClassName}>{item.detail}</span>
        ) : item.country ? (
          <span className={countryClassName}>{item.country}</span>
        ) : null}
      </div>
    </div>
  );
} 