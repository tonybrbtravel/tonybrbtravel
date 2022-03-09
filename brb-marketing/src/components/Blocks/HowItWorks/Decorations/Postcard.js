import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import Metrics from '../../../../themes/Metrics';
import Colors, { rgba } from '../../../../themes/Colors';
import Timings from '../../../../themes/Timings';
import Decorations from '../../../../themes/Decorations';
import Breakpoints from '../../../../themes/Breakpoints';

import logo from '../../../../images/logo.svg';

const Wrapper = styled.div`
  position: relative;
  height: 80vw;
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Metrics.smallSpacer};
  left: calc(10vw - ${Metrics.bigSpacer});

  @media screen and (min-width: ${Breakpoints.medium}) {
    height: 100%;
    width: 100%;
    left: 0;
  }
`;

const Envelope = styled.div`
  position: relative;
  max-width: 45rem;
  width: 100%;
  height: 100%;

  svg.envelope, img.envelope-logo {
    position: absolute;
    pointer-events: none;
    left: 17.5%;
    width: 65%;
    bottom: ${(props) => props.opened ? '0' : Metrics.bigSpacer};
    transform: ${(props) => props.opened ? 'scale(.75)' : 'none'};
    opacity: ${(props) => props.opened ? '0' : '1'};
    transition:
      bottom ${Timings.transition.default} ease-in-out,
      transform ${Timings.transition.default} ${Timings.transition.slow} ease-in-out,
      opacity ${Timings.transition.default} ${Timings.transition.slow} ease-in-out;
  }

  img.envelope-logo {
    left: 50%;
    transform: ${(props) => props.opened ? 'translateX(-50%) scale(.75)' : 'translateX(-50%)'};
    bottom: ${(props) => props.opened ? Metrics.tinySpacer : `calc(${Metrics.bigSpacer} + ${Metrics.tinySpacer})`};
    width: 10%;
  }
`;

const VideoHolder = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: ${(props) => props.opened ? 'translate(-50%, 50%)' : 'translateX(-50%)'};
  bottom: ${(props) => props.opened ? '50%' : Metrics.bigSpacer};
  overflow: hidden;
  box-shadow: ${Decorations.shadow.default};
  border-radius: ${Metrics.tinySpacer};
  width: ${(props) => props.opened ? '80%' : '60%'};
  padding-bottom: ${(props) => props.opened ? '80%' : '60%'};
  transition:
    width ${Timings.transition.slow} ${Timings.transition.slow} ease-in-out,
    padding ${Timings.transition.slow} ${Timings.transition.slow} ease-in-out,
    transform ${Timings.transition.slow} ${Timings.transition.default} ease-in-out,
    bottom ${Timings.transition.slow} ease-in-out;

  video, img {
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    object-fit: cover;
  }

  &:after {
    content: ${(props) => props.playing ? 'none' : '""'};
    position: absolute;
    background-color: ${rgba(Colors.black, .3)};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.opened || !props.hasImage) ? 1 : 0};
`;

const PlayButton = styled.div`
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: ${rgba(Colors.black, .2)};
  width: 5rem;
  height: 5rem;
  padding: ${Metrics.tinySpacer};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${Timings.transition.default} ease-in-out;

  &:hover {
    background-color: ${rgba(Colors.black, .5)};
  }

  svg {
    position: static;
    width: 100%;
    height: 100%;
  }
`;

const defaultContent = {};

const query = graphql`{
  contentfulConfigurationItem(contentful_id: {eq: "3CXFAc1BiYvQ9ar4kGdIBV"}) {
    media {
      file {
        contentType
        url
      }
    }
  }
}`;

const processQueryResult = (queryData) => {
  const data = queryData.contentfulConfigurationItem.data || {};

  // Extract the first available image and video URLs
  queryData.contentfulConfigurationItem.media.forEach((media) => {
    if (/^image\//.test(media.file.contentType) && !data.image) {
      data.image = media.file.url;
    }
    if (/^video\//.test(media.file.contentType) && !data.video) {
      data.video = media.file.url;
    }
  });

  return data;
};

const Postcard = () => {

  const videoElement = useRef();
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);

  const queryResult = useStaticQuery(query);
  const content = { ...defaultContent };

  if (queryResult.contentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  const startVideo = () => {
    setOpened(true);
    setPlaying(true);
    videoElement.current.play();
  };

  const resetVideo = () => {
    setPlaying(false);
  };

  const playPause = (e) => {
    if (videoElement.current.paused) {
      videoElement.current.play();
      setPlaying(true);
    } else {
      videoElement.current.pause();
      setPlaying(false);
    }
  }

  useEffect(() => {
    if (opened) {
      const vidEl = videoElement.current;
      vidEl.addEventListener('ended', resetVideo);
      return () => {
        vidEl.removeEventListener('ended', resetVideo);
      }
    }
  }, [opened]);

  return <Wrapper>

    <Envelope opened={opened} onClick={opened ? null : startVideo}>

      <svg className="envelope" viewBox="-1 -1 512 472" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M459.38 469.75H51.2298C37.8453 469.75 25.0091 464.433 15.5448 454.969C6.08061 445.505 0.763672 432.669 0.763672 419.284V232.29C0.763673 229.575 1.31687 226.888 2.38948 224.393C3.46208 221.898 5.03162 219.648 7.00239 217.78L223.281 12.7657C231.929 4.56889 243.39 0 255.305 0C267.22 0 278.681 4.56889 287.328 12.7657L493.539 208.236C498.69 213.119 502.793 219 505.596 225.521C508.4 232.042 509.846 239.065 509.846 246.163V419.284C509.846 425.912 508.54 432.474 506.004 438.597C503.468 444.72 499.751 450.283 495.065 454.969C490.378 459.655 484.815 463.373 478.692 465.909C472.569 468.445 466.007 469.75 459.38 469.75Z" fill="#D0D3DE" />
      </svg>

      <VideoHolder opened={opened} playing={playing}>

        {content.image &&
          <img src={content.image} alt="" />
        }

        <VideoWrapper opened={opened} hasImage={!!content.image}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src={content.video} ref={videoElement} playsInline onClick={playPause} />
        </VideoWrapper>

        {(!opened || !playing) &&
          <PlayButton>
            <svg viewBox="0 0 71 81" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M66.6025 33.5812C71.9063 36.6502 71.9319 44.2983 66.6488 47.4028L12.3781 79.2934C7.05529 82.4212 0.345828 78.5966 0.325151 72.4228L0.112745 9.00591C0.0920674 2.83217 6.77578 -1.03728 12.1194 2.05479L66.6025 33.5812Z" fill="white" fillOpacity="0.8" />
            </svg>
          </PlayButton>
        }

      </VideoHolder>

      <svg className="envelope" viewBox="0 0 510 242" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M254.774 118.192L14.2397 1.93338C12.752 1.21429 11.1059 0.884701 9.45599 0.97559C7.80604 1.06648 6.20617 1.57483 4.80637 2.45299C3.40657 3.33115 2.25268 4.55038 1.45284 5.99636C0.653001 7.44234 0.2334 9.06774 0.233398 10.7202V210.747C0.233397 214.749 1.0216 218.711 2.55301 222.408C4.08443 226.106 6.32908 229.465 9.15877 232.295C11.9885 235.124 15.3478 237.369 19.0449 238.9C22.7421 240.432 26.7047 241.22 30.7065 241.22H478.842C482.844 241.22 486.807 240.432 490.504 238.9C494.201 237.369 497.56 235.124 500.39 232.295C503.22 229.465 505.464 226.106 506.996 222.408C508.527 218.711 509.315 214.749 509.315 210.747V14.1468C509.315 12.1303 508.803 10.1469 507.827 8.38242C506.851 6.61794 505.443 5.13023 503.735 4.05863C502.027 2.98704 500.075 2.36672 498.061 2.25582C496.048 2.14491 494.04 2.54702 492.224 3.42451L254.774 118.192Z" fill="#E94560" />
      </svg>

      <img className="envelope-logo" src={logo} alt="" />

    </Envelope>

  </Wrapper>
};

export default Postcard;
