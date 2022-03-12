import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { onAnimationComplete } from 'utils';
import Icon from 'components/Icon/Icon';
import './Input.scss';

const Input: React.FC<
  Readonly<
    {
      leftIcon?: string;
      rightIcon?: string;
      onEnter?: () => void;
      focus?: boolean;
      spellCheck?: boolean;
      animate?: boolean;
      dark?: boolean;
    } & React.InputHTMLAttributes<HTMLInputElement>
  >
> = ({
  leftIcon,
  rightIcon,
  onEnter,
  focus,
  spellCheck,
  animate,
  dark,
  ...nativeElemProps
}) => {
  const inputElem = useRef<HTMLInputElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    animate && setFull(true);
    onAnimationComplete(() => focus && inputElem?.current?.focus());
  }, [animate, focus]);

  const disabled = nativeElemProps.onClick ? true : false;

  return (
    <div
      className={classNames('input', {
        animate,
        full,
        dark
      })}
      data-test="input"
    >
      {disabled && <div className="disabled-overlay" onClick={nativeElemProps.onClick} />}
      {leftIcon && <Icon name={leftIcon} className="left-icon" />}
      <input
        ref={inputElem}
        type="text"
        onKeyPress={({ key }) => onEnter && key === 'Enter' && onEnter()}
        disabled={disabled}
        spellCheck={spellCheck || false}
        data-test="field"
        {...nativeElemProps}
        className={classNames(nativeElemProps.className, {
          'has-left-icon': leftIcon
        })}
      />
      {rightIcon && <Icon name={rightIcon} className="right-icon" />}
    </div>
  );
};

export default Input;
