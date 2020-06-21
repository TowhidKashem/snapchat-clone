import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnapchatSquare, faForumbee } from '@fortawesome/free-brands-svg-icons';
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
  faSmileWink,
  faEllipsisV,
  faEllipsisH,
  faCog,
  faTimesCircle,
  faTimes,
  faAngleLeft,
  faSearchPlus,
  faPaw,
  faSpider,
  faWater,
  faPhoneAlt,
  faVideo,
  faRocket,
  faMicrophone,
  faDownload,
  faTextHeight,
  faPen,
  faStickyNote,
  faCut,
  faPaperclip,
  faCropAlt,
  faStopwatch,
  faExternalLinkAlt,
  faPlayCircle,
  faEdit,
  faMagic,
  faQrcode,
  faSnowflake,
  faIcicles,
  faCloudMeatball,
  faPooStorm,
  faCloudShowersHeavy,
  faCloudRain,
  faCloud,
  faCloudSun,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const iconMap = {
  // free-brands-svg-icons
  faSnapchatSquare,
  faForumbee,
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
  faSmileWink,
  faEllipsisV,
  faEllipsisH,
  faCog,
  faTimesCircle,
  faTimes,
  faAngleLeft,
  faSearchPlus,
  faPaw,
  faSpider,
  faWater,
  faPhoneAlt,
  faVideo,
  faRocket,
  faMicrophone,
  faDownload,
  faTextHeight,
  faPen,
  faStickyNote,
  faCut,
  faPaperclip,
  faCropAlt,
  faStopwatch,
  faExternalLinkAlt,
  faPlayCircle,
  faEdit,
  faMagic,
  faQrcode,
  faSnowflake,
  faIcicles,
  faCloudMeatball,
  faPooStorm,
  faCloudShowersHeavy,
  faCloudRain,
  faCloud,
  faCloudSun,
  faSun
};

interface Props {
  icon: string;
  size?: string;
  onClick?: () => void;
  className?: string;
}

const Icon: React.FC<Props> = ({ icon, size, onClick, className = '' }) =>
  icon ? (
    <FontAwesomeIcon
      icon={iconMap[icon]}
      size={size as any}
      onClick={onClick}
      className={classNames('icon', {
        [className]: className
      })}
    />
  ) : null;

export default Icon;
