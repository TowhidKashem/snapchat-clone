import React from 'react';

const useOutsideClick = (ref, cb) => {
  const onClick = (e) => {
    return ref.current && !ref.current.contains(e.target) && cb();
  };
  React.useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  });
};

export default useOutsideClick;
