import React from 'react';
import './Avatar.scss';

export const sizeMap: Record<string, number> = {
  sm: 45,
  md: 100,
  lg: 150
};

export type sizeType = keyof typeof sizeMap;

const Avatar: React.FC<
  Readonly<{
    src: string;
    size?: sizeType;
  }>
> = ({ src, size = 'md' }) => (
  <img src={src} className="avatar" alt="" width={sizeMap[size]} />
);

export default Avatar;
