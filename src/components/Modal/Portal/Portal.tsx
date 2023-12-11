import { FC, PropsWithChildren, useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};
