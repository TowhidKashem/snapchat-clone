import React, { useRef } from 'react';
import classNames from 'classnames';
import useDrawerEnter from 'hooks/useDrawerEnter';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  placeholder: string;
  value?: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  focus?: boolean;
  spellCheck?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  value,
  leftIcon,
  rightIcon,
  onClick,
  onFocus,
  onChange,
  onEnter,
  focus,
  spellCheck
}) => {
  const inputElem = useRef<any>();

  useDrawerEnter(() => focus && inputElem.current.focus());

  return (
    <div className="input" onClick={onClick}>
      {leftIcon && <Icon icon={leftIcon} className="left-icon" />}
      <input
        type="text"
        ref={inputElem}
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onKeyPress={({ key }) => onEnter && key === 'Enter' && onEnter()}
        disabled={onClick ? true : false}
        spellCheck={spellCheck || false}
        className={classNames({
          'has-left-icon': leftIcon
        })}
      />
      {rightIcon && <Icon icon={rightIcon} className="right-icon" />}
    </div>
  );
};

export default Input;
