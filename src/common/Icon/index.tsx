import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnapchatSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faCamera,
  faCommentDots,
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
  faCircle,
  faCircleNotch,
  faLaugh
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  icon: string;
  onClick?: () => void;
  className?: string;
}

const Icon: React.FC<Props> = ({ icon, onClick, className }) => {
  const iconMap = {
    // free-brands-svg-icons
    faSnapchatSquare,
    // free-solid-svg-icons
    faCamera,
    faCommentDots,
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
    faCircle,
    faCircleNotch,
    faLaugh
  };
  return icon ? (
    <FontAwesomeIcon icon={iconMap[icon]} onClick={onClick} className={className} />
  ) : null;
};

export default Icon;
