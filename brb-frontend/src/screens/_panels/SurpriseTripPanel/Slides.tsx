import { useState } from 'react';
import styled from 'styled-components';
import { IHotelSliderDetails } from '../../../interfaces/hotelType';

import BrbEndPoints from '../../../Api/BrbEndPoints';
import useApiQuery from '../../../Hooks/ApiQuery';
import { getBRBHotelsInfo } from '../../../Api/HotelApi';
import Timings from '../../../themes/Timings';
import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';
import Decorations from '../../../themes/Decorations';

import fallbackBackgroundImage from '../../../images/locations/seville.jpg';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${fallbackBackgroundImage});
  background-size: cover;
  background-position: center center;
`;

const SlidesWrapper = styled.div<{
  activeOffset: number;
}>`
  transform: translateX(-${({ activeOffset }) => activeOffset * 100}%);
  transition: transform ${Timings.transition.default} ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div<{
  backgroundImage: string;
  localOffset: number;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: ${({ localOffset }) => localOffset * 100}%;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center center;
`;

const Arrow = styled.div<{
  align: 'left' | 'right';
}>`
  position: absolute;
  width: 30%;
  height: 100%;
  top: 0;
  left: ${({ align }) => (align === 'left' ? '0' : 'auto')};
  right: ${({ align }) => (align === 'right' ? '0' : 'auto')};
  background-image: linear-gradient(to ${({ align }) => align}, transparent, ${rgba(Colors.brbPink, 0.25)} 75%);
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align === 'left' ? 'flex-start' : 'flex-end')};
  font-size: 3rem;
  color: ${Colors.brbOffwhite};
  padding: ${Metrics.tinySpacer};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  user-select: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity ${Timings.transition.default} ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Text = styled.div`
  backdrop-filter: blur(5px);
  background: ${rgba(Colors.brbOffwhite, 0.75)};
  color: ${Colors.brbBlue};
  margin: ${Metrics.tinySpacer};
  padding: ${Metrics.tinySpacer};
  border-radius: 8px;
  box-shadow: ${Decorations.shadow.default};
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`;

const Dot = styled.div<{ active: boolean }>`
  display: inline-block;
  background: ${({ active }) => (active ? Colors.brbPink : Colors.brbOffwhite)};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: .5rem;
  box-shadow: ${Decorations.shadow.default};
  cursor: pointer;
`;

const Stars = styled.div`
  display: block;
  font-size: 2rem;
  line-height: 1;
  // margin-bottom: ${Metrics.tinySpacer};
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const Star = () => <>★</>;

const Slides = () => {
  const { data: hotelInfo = [] } = useApiQuery<IHotelSliderDetails[]>(
    // TODO: Rework this API, reduce URL redundancy, fix specific wrapper
    //       functions that aren't actually specific, etc. etc.
    BrbEndPoints.getBRBTop3Hotels,
    { url: BrbEndPoints.getBRBTop3Hotels },
    getBRBHotelsInfo,
  );

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const onNextSlide = () => { setActiveSlide((activeSlide + 1) % hotelInfo.length); };
  const onPrevSlide = () => { setActiveSlide((activeSlide + hotelInfo.length - 1) % hotelInfo.length); };

  return (
    <Wrapper>
      {
        hotelInfo.length > 0 && (
          <>
            <SlidesWrapper activeOffset={activeSlide}>
              {hotelInfo?.map((hotel, index) => (
                <Slide key={hotel.hotelId} backgroundImage={hotel.hotelImage} localOffset={index}>
                  <Text>
                    <Title>
                      {hotel.hotelName}
                      {hotel.hotelCity ? `, ${hotel.hotelCity}` : null}
                    </Title>
                    <Stars>
                      {
                        // eslint-disable-next-line react/no-array-index-key
                        [...Array(hotel.starRating)].map((_, starIndex) => <Star key={starIndex} />)
                      }
                    </Stars>
                    {/* {hotel.hotelDescription} */}
                  </Text>
                </Slide>
              ))}
            </SlidesWrapper>
            <Arrow align="left" onClick={onPrevSlide}>&larr;</Arrow>
            <Arrow align="right" onClick={onNextSlide}>&rarr;</Arrow>
            <DotsWrapper>
              {hotelInfo?.map((hotel, index) => (
                <Dot key={hotel.hotelId} onClick={() => setActiveSlide(index)} active={index === activeSlide} />
              ))}
            </DotsWrapper>
          </>
        )
      }
    </Wrapper>
  );
};

export default Slides;
