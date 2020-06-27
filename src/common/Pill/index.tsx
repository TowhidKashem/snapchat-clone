import React from 'react';
import Button from 'common/Button';
import './index.scss';

interface Props {
  icons: string[];
}

const Pill: React.FC<Props> = ({ icons }) => (
  <div className="pill">
    {icons.map((icon) => (
      <Button key={icon} icon={icon} />
    ))}
  </div>
);

export default Pill;
