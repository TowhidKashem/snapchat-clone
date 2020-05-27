// Runs a callback function after the drawer eenter animation is complete
// 300ms is the `animationInDuration` value of most drawers so it's the defailt here as well
import React, { useEffect } from 'react';

const useDrawerEnter = (callback, animationInDuration = 300) => {
  useEffect(() => {
    setTimeout(callback, animationInDuration);
  }, []);
};

export default useDrawerEnter;
