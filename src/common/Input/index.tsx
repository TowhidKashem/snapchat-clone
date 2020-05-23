import React from 'react';
import Icon from 'common/Icon';
import './index.scss';

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
    <div className="input">
      {leftIcon && <Icon icon={leftIcon} className="left-icon" />}
      <input
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
      />
      {rightIcon && (
        <Icon icon={rightIcon} className="right-icon" onClick={rightIconClick} />
      )}
    </div>
  );
};

export default Input;
