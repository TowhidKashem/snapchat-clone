import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  leftIcon: any;
  rightIcon?: any;
  rightIconClick?: () => void;
  onFocus?: () => void;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  placeholder,
  leftIcon,
  rightIcon,
  rightIconClick,
  onFocus,
  onChange
}) => {
  const iconClick = rightIconClick
    ? {
        onClick: rightIconClick
      }
    : {};
  return (
    <div className={styles.input}>
      {leftIcon && <FontAwesomeIcon icon={leftIcon} className={styles.leftIcon} />}
      <input
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
      />
      {rightIcon && (
        <FontAwesomeIcon icon={rightIcon} className={styles.rightIcon} {...iconClick} />
      )}
    </div>
  );
};

export default Input;
