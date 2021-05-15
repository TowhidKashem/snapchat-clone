import React from 'react';
import Button from 'common/Button';
import './index.scss';

const Pill: React.FC<{
  readonly icons: string[];
}> = ({ icons }) => (
  <div className="pill">
    {icons.map((icon) => (
      <Button key={icon} icon={icon} />
    ))}
  </div>
);

export default Pill;
