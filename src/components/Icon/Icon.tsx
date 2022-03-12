import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faSnapchatSquare,
  faGithub,
  IconDefinition
} from '@fortawesome/free-brands-svg-icons';
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
  faSun,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import './Icon.scss';

export const iconMap: Record<string, IconDefinition> = {
  // free-brands-svg-icons
  faSnapchatSquare,
  faGithub,
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
  faSun,
  faExclamationCircle
};

const Icon: React.FC<Readonly<{ name: string } & Partial<FontAwesomeIconProps>>> = ({
  name,
  ...libraryProps
}) => (
  <FontAwesomeIcon
    {...libraryProps}
    icon={iconMap[name] as IconProp}
    className={`icon ${libraryProps.className}`}
  />
);

export default Icon;
