import React from 'react';
import './index.scss';

export type sizeType = 'sm' | 'md' | 'lg';

interface Props {
  src: string;
  size?: sizeType;
}

export const sizeMap = {
  sm: 45,
  md: 100,
  lg: 150
};

const Avatar: React.FC<Props> = ({ src, size = 'md' }) => (
  <img src={src} className="avatar" alt="" width={sizeMap[size]} />
);

export default Avatar;
