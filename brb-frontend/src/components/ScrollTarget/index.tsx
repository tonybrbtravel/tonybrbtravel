import React, { useRef, useEffect, ForwardedRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Metrics from '../../themes/Metrics';

const Wrapper = styled.div`
  position: relative;
  height: 0;
  overflow: hidden;
  top: -${Metrics.navHeightCollapsed};
`;

type ScrollTargetProps = {
  id: string,
};

const ScrollTarget = React.forwardRef<HTMLDivElement, ScrollTargetProps>(
  (
    { id }: ScrollTargetProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const history = useHistory();
    const location = useLocation();
    const localRef = useRef<HTMLDivElement | null>(null);

    // When we're first being rendered check the URL fragment for a match
    // and if so, scroll to ourselves after a tiny pause
    useEffect(() => {
      if (location.hash === `#${id}`) {
        window.setTimeout(() => {
          if (localRef?.current) {
            window.scroll({
              top: localRef?.current.offsetTop,
              left: 0,
              behavior: 'smooth',
            });
          }
        }, 200);
        // Clean up the hash so other fragment pushes on this page can trigger the scroll
        history.replace(location.pathname);
      }
    }, [ref, location.hash]);

    return (
      <Wrapper
        id={id}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            // eslint-disable-next-line no-param-reassign
            ref.current = node;
          }
        }}
      />
    );
  },
);

export default ScrollTarget;
