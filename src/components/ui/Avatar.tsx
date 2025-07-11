import React from 'react';
import styles from '@/styles/ui/Avatar.module.scss';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const shouldShowInitials = !src || imageError || !imageLoaded;
  const displayInitials = initials || (alt ? alt.charAt(0).toUpperCase() : '?');

  const avatarClasses = [
    styles.avatar,
    styles[`avatar--${size}`],
    styles[`avatar--${shape}`],
    status && styles[`avatar--${status}`],
    onClick && styles.avatarClickable,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarClasses} onClick={onClick}>
      {src && !imageError && (
        <img
          src={src}
          alt={alt}
          className={styles.avatarImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {shouldShowInitials && (
        <div className={styles.avatarInitials}>
          {displayInitials}
        </div>
      )}
      
      {status && (
        <div className={`${styles.avatarStatus} ${styles[`avatarStatus--${status}`]}`} />
      )}
    </div>
  );
}; 