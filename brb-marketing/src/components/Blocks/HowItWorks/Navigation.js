import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import Colors from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';

const Wrapper = styled.div`
  position: relative;
`;

const NavWrapper = styled.div`
  position: ${({ stuck }) => stuck ? 'fixed' : 'absolute'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${Metrics.bigSpacer};
  height: 100vh;
  left: 0;
  top: ${({ navAtTop }) => navAtTop ? '0' : 'auto'};
  bottom: ${({ navAtTop }) => navAtTop ? 'auto' : '0'};
  color: ${Colors.lightGrey};
  will-change: transform;
  z-index: 100;
  mix-blend-mode: difference;
`;

const Dot = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.active ? Colors.lightGrey : 'transparent'};
  border-color: ${Colors.lightGrey};
  border-style: ${(props) => props.active ? 'none' : 'solid'};
  border-width: 1.5px;
  margin: ${Metrics.tinySpacer} 0;
`;

const Navigation = ({ children }) => {

  const [navAtTop, setNavAtTop] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(0);

  const childElementArray = useRef([]);
  const wrapper = useRef();

  useEffect(() => {

    const scrollHandler = () => {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      const windowHeight = window.innerHeight;
      const wrapperRect = wrapper.current.getBoundingClientRect();
      const wrapperTop = wrapperRect.top + scrollTop;
      const wrapperBottom = wrapperRect.bottom + scrollTop;
      const averageChildHeight = wrapperRect.height / children.length;

      setStuck(scrollTop > wrapperTop && scrollTop < (wrapperBottom - windowHeight));
      setNavAtTop(scrollTop < wrapperTop);

      setCurrent(Math.max(0, Math.floor((averageChildHeight * .35 - wrapperRect.top) / averageChildHeight)));
    };

    document.addEventListener('scroll', scrollHandler, { passive: true });
    return () => document.removeEventListener('scroll', scrollHandler, { passive: true });
  }, [children]);

  return <>
    <Wrapper ref={wrapper}>
      <NavWrapper navAtTop={navAtTop} stuck={stuck}>
        {[...new Array(children.length)].map((_, index) => {
          childElementArray.current.push(children[index]);
          return <Dot key={index} active={index === current} />;
        }
        )}
      </NavWrapper>
      {children}
    </Wrapper>
  </>
};

export default Navigation;
