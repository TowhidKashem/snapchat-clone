import React from 'react';
import Icon from 'common/Icon';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  leftIcon: string;
  rightIcon?: string;
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
  return (
    <div className={styles.input}>
      {leftIcon && <Icon icon={leftIcon} className={styles.leftIcon} />}
      <input
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
      />
      {rightIcon && (
        <Icon icon={rightIcon} className={styles.rightIcon} onClick={rightIconClick} />
      )}
    </div>
  );
};

export default Input;
