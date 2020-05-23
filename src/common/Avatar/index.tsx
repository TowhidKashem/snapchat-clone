import React from 'react';
import './index.scss';

interface Props {
  src: string;
}

const Avatar: React.FC<Props> = ({ src }) => <img src={src} className="avatar" alt="" />;

export default Avatar;
