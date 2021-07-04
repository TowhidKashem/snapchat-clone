import React from 'react';
import { Object } from 'types';
import './index.scss';

export type sizeType = 'sm' | 'md' | 'lg';

export const sizeMap: Object<number> = {
  sm: 45,
  md: 100,
  lg: 150
};

const Avatar: React.FC<{
  readonly src: string;
  readonly size?: sizeType;
}> = ({ src, size = 'md' }) => (
  <img src={src} className="avatar" alt="" width={sizeMap[size]} />
);

export default Avatar;
