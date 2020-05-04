import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnapchatSquare } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faCamera,
  faUserPlus,
  faListAlt,
  faGrinBeam,
  faAngleRight,
  faCompass,
  faUserCircle,
  faSearch,
  faRetweet,
  faAngleDown,
  faLocationArrow,
  faSignal,
  faBatteryHalf,
  faCommentAlt,
  faMobile,
  faMobileAlt,
  faCircle as faDot,
  faLaugh,
  faEllipsisV,
  faCog,
  faTimesCircle,
  faAngleLeft,
  faSearchPlus
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  // free-brands-svg-icons
  faSnapchatSquare,
  // free-regular-svg-icons
  faCircle,
  // free-solid-svg-icons
  faCamera,
  faUserPlus,
  faListAlt,
  faGrinBeam,
  faAngleRight,
  faCompass,
  faUserCircle,
  faSearch,
  faRetweet,
  faAngleDown,
  faLocationArrow,
  faSignal,
  faBatteryHalf,
  faCommentAlt,
  faMobile,
  faMobileAlt,
  faDot,
  faLaugh,
  faEllipsisV,
  faCog,
  faTimesCircle,
  faAngleLeft,
  faSearchPlus
};

interface Props {
  icon: string;
  size?: string;
  onClick?: () => void;
  className?: string;
}

const Icon: React.SFC<Props> = ({ icon, size, onClick, className }) =>
  icon ? (
    <FontAwesomeIcon
      icon={iconMap[icon]}
      size={size as any}
      onClick={onClick}
      className={className}
    />
  ) : null;

export default Icon;
