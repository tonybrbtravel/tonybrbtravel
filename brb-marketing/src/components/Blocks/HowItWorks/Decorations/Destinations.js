import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import Colors from '../../../../themes/Colors';
import Breakpoints from '../../../../themes/Breakpoints';

import placeholderImage from '../../../../images/locations/bordeaux.jpg';
import Metrics from '../../../../themes/Metrics';
import Decorations from '../../../../themes/Decorations';

const defaults = {
  cta: {
    label: 'Browse all destinations',
    to: '/destinations',
  },
  items: [
    { name: "Image 1", image: placeholderImage },
    { name: "Image 2", image: placeholderImage },
    { name: "Image 3", image: placeholderImage },
    { name: "Image 4", image: placeholderImage },
    { name: "Image 5", image: placeholderImage },
    { name: "Image 6", image: placeholderImage },
  ],
};

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.white};
  text-shadow: none;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: ${Metrics.smallSpacer};
  justify-content: center;


  @media (min-width: ${Breakpoints.medium}) {
    margin-top: 0;
  }
`;

const ImagesWrapper = styled.div`
  display: ${(props) => props.version === 'desktop' ? 'none' : 'block'};
  position: relative;
  margin: auto;
  width: 50vw;
  height: 50vw;

  @media (min-width: ${Breakpoints.medium}) {
    display: ${(props) => props.version === 'desktop' ? 'block' : 'none'};
    perspective-origin: center center;
    perspective: 150px;
    width: 30vw;
    height: 30vw;
    max-width: 500px;
    max-height: 500px;
  }
`;

const ImageCloudImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  opacity: .5;

  &:first-child {
    z-index: 100;
    opacity: 1;
    transform: translate3d(0, 0, 10px);
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  margin-left: -${Metrics.bigSpacer};
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { width: 0 !important; height: 0 !important; }
`;

const CarouselContent = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: 100%;
  padding: 0 ${Metrics.bigSpacer};
`;

const CarouselItemWrapper = styled.div`
  position: relative;
  height: 100%;
  max-width: 60vw;
  margin-right: ${Metrics.smallSpacer};
  user-select: none;

  &:last-child {
    margin-right: 0;
  }
`;

const CarouselText = styled.p`
  position: absolute;
  margin: 0;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 700;
  text-shadow: ${Decorations.shadow.default};
  left: ${Metrics.smallSpacer};
  bottom: ${Metrics.tinySpacer};

  @media (min-width: ${Breakpoints.small}) {
    font-size: 1.5rem;
  }
`;

const CarouselImage = styled.img`
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
`;

const randomInt = (start, end) => Math.round(Math.random() * (end - start) + start);

const staticQuery = graphql`{
  contentfulConfigurationItem(name: {eq: "How it works - destinations"}) {
    data {
      stringArray
    }
    media {
      fixed(width: 500, quality: 75) {
        src
      }
      file {
        contentType
      }
    }
  }
}`;

const processQueryResult = (queryData) => {
  const content = { ...queryData.contentfulConfigurationItem.data };
  content.items = [];

  queryData.contentfulConfigurationItem.media.forEach((media, index) => {
    if (/^image\//.test(media.file.contentType)) {
      content.items.push({
        name: content.stringArray[index] || '',
        image: media.fixed.src,
      });
    }
  });

  delete content.stringArray;

  return content;
};

const Destinations = () => {

  const queryResult = useStaticQuery(staticQuery);

  const content = { ...defaults };

  if (queryResult.contentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  const imagesWrapper = useRef();
  const animationFrameRequestID = useRef();
  const mouseCoordinates = useRef({ x: 0, y: 0 });
  const currentPerspective = useRef({ x: 0, y: 0 });
  const targetPerspective = useRef({ x: 0, y: 0 });

  const [offsetAngleDeg] = useState(randomInt(0, 360));

  const update = () => {
    const windowHeight = window.innerHeight;
    const rect = imagesWrapper.current.getBoundingClientRect();
    const center = {
      x: 0, // (Don't care about horizontal from screen position)
      y: -.2 * ((rect.y + rect.height / 2) - windowHeight / 2),
    }
    targetPerspective.current.x = (rect.width / 2) + .2 * (center.x - mouseCoordinates.current.x);
    targetPerspective.current.y = (rect.height / 2) + 2 * (center.y - mouseCoordinates.current.y);
  };

  // Animation handler
  const animate = useCallback(
    () => {
      animationFrameRequestID.current = window.requestAnimationFrame(animate);
      currentPerspective.current.x = currentPerspective.current.x * .975 + targetPerspective.current.x * .025;
      currentPerspective.current.y = currentPerspective.current.y * .975 + targetPerspective.current.y * .025;
      imagesWrapper.current.style.perspectiveOrigin = `${currentPerspective.current.x}px ${currentPerspective.current.y}px`;
    },
    []
  );

  // Interaction handlers
  const mouseMove = useCallback(
    (mouseEvent) => {
      const rect = imagesWrapper.current.getBoundingClientRect();
      mouseCoordinates.current.x = .5 * (mouseEvent.clientX - rect.left - rect.width / 2);
      mouseCoordinates.current.y = Math.max(-10, Math.min(10, .025 * (mouseEvent.clientY - rect.top - rect.height / 2)));
      update();
    },
    []
  );

  useEffect(() => {

    // Initialisation
    const imageElementNodeList = imagesWrapper.current.querySelectorAll('img');
    imageElementNodeList.forEach((element, index) => {

      if (index > 0) {
        const distance = 2 * randomInt(50, 75)
        const angle = offsetAngleDeg + 360 * index / (imageElementNodeList.length - 1);

        const x = distance * Math.sin(angle * Math.PI / 180);
        const y = distance * Math.cos(angle * Math.PI / 180);
        const z = -1 * randomInt(50, 100);

        element.style.transform = `translate3D(${x}vw, ${y}vw, ${z}vw) scale(${1 + 2 * (1000 + z) / 1000})`;
        element.style.opacity = 1 - (-z) / 100;
      }

    });

    document.addEventListener('mousemove', mouseMove);
    window.addEventListener('scroll', update);
    update();
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameRequestID.current);
      document.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', update);
    };

  }, [offsetAngleDeg, animate, mouseMove]);

  return <>
    <Wrapper onMouseMove={mouseMove}>

      {/* Mobile version (carousel) */}
      <ImagesWrapper>
        <CarouselWrapper>
          <CarouselContent>
            {content.items.map((item, index) =>
              <CarouselItemWrapper key={index}>
                <CarouselImage alt={`Typical scene from ${item.name}`} src={item.image} />
                <CarouselText>{item.name}</CarouselText>
              </CarouselItemWrapper>
            )}
          </CarouselContent>
        </CarouselWrapper>
      </ImagesWrapper>

      {/* Desktop version (image cloud) */}
      <ImagesWrapper ref={imagesWrapper} version="desktop">
        {content.items.map((item, index) => <ImageCloudImage key={index} alt={`Typical scene from ${item.name}`} src={item.image} />)}
      </ImagesWrapper>

    </Wrapper>
  </>
};

export default Destinations;
