import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number | string;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComp, size = 20, color, className }) => {
  return <IconComp size={size} color={color} className={className} />;
}; 