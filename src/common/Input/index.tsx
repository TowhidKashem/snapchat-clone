import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  leftIcon: any;
  rightIcon: any;
  rightIconClick: () => void;
}

const Input: React.FC<Props> = ({ placeholder, leftIcon, rightIcon, rightIconClick }) => {
  const iconClick = rightIconClick
    ? {
        onClick: rightIconClick
      }
    : {};
  return (
    <div className={styles.input}>
      {leftIcon && <FontAwesomeIcon icon={leftIcon} className={styles.leftIcon} />}
      <input type="text" placeholder={placeholder} />
      {rightIcon && (
        <FontAwesomeIcon icon={rightIcon} className={styles.rightIcon} {...iconClick} />
      )}
    </div>
  );
};

export default Input;
