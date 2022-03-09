import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import useApiQuery from '../../../Hooks/ApiQuery';
import { getRewards } from '../../../Api/brbApi';
import BrbEndPoints from '../../../Api/BrbEndPoints';
import Colors, { rgba } from '../../../themes/Colors';
import Metrics from '../../../themes/Metrics';

import { RewardServiceType } from '../../../interfaces/rewardServiceType';

import BRBSwiper from '../../../components/BRBSwiper';

import img1 from '../../../assets/images/rewards/CO2-Offsetting.jpg';
import img2 from '../../../assets/images/rewards/Airport-Fast-Track.jpg';
import img3 from '../../../assets/images/rewards/Travel_Insurance.jpg';
import img4 from '../../../assets/images/rewards/Bottle-on-Arrival.jpg';
import img5 from '../../../assets/images/rewards/Room-Upgrade.jpg';
import img6 from '../../../assets/images/rewards/Free-Breakfast.jpg';
import img7 from '../../../assets/images/rewards/Airport-Transfers.jpg';
import img8 from '../../../assets/images/rewards/Lounge-Access.jpg';
import img9 from '../../../assets/images/rewards/Hoodie.jpg';
import img10 from '../../../assets/images/rewards/Free-Trip.jpg';
import Decorations from '../../../themes/Decorations';
import Breakpoints from '../../../themes/Breakpoints';

const RewardsWrapper = styled.div`
  margin: ${Metrics.mediumSpacer} 0;
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .overlay {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: ${rgba(Colors.brbBlue, 0.75)};
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: ${Decorations.shadow.detail};
    user-select: none;
    pointer-events: none;

    p {
      color: ${Colors.brbOffwhite};
      font-weight: 700;
      font-size: 10vw;
      text-align: center;
      transform: rotate(-5deg);
      border: 5px solid currentColor;
      padding: .5em;
      box-shadow: ${Decorations.shadow.detail};
      background-color: ${rgba(Colors.brbBlue, 0.25)};
      backdrop-filter: blur(5px);

      @media (min-width: ${Breakpoints.small}) {
        font-size: 3rem;
      }

    }
  }

`;

const RewardTile = styled.div<{ backgroundImage: string, big?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 20rem;
  flex-grow: 1;
  flex-basis: ${({ big }) => (big ? '30em' : '20em')};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center center;
  user-select: none;

  p {
    width: 100%;
    text-align: center;
    color: ${Colors.brbOffwhite};
    background-color: ${Colors.brbPink};
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2;
  }
`;

export const MyBRBRewardsSlider = () => {
  const user = useSelector((state: any) => state.dashboard.user);
  const [rewardsData, setRewardsData] = useState<RewardServiceType[]>([]);

  const { data: rewardsService } = useApiQuery<any>(
    BrbEndPoints.getRewardsService,
    { url: BrbEndPoints.getRewardsService },
    getRewards,
  );

  useEffect(() => {
    if (rewardsService && rewardsService.length > 0) {
      setRewardsData(rewardsService);
    }
  }, [rewardsService]);

  const rewardsCards = rewardsData && rewardsData.map((item: RewardServiceType) => {
    let image = '';

    switch (item.id) {
      case 10:
        image = img10;
        break;
      case 9:
        image = img9;
        break;
      case 8:
        image = img8;
        break;
      case 7:
        image = img7;
        break;
      case 6:
        image = img5;
        break;
      case 5:
        image = img6;
        break;
      case 3:
        image = img4;
        break;
      case 4:
        image = img3;
        break;
      case 2:
        image = img2;
        break;
      case 1:
        image = img1;
        break;
      default:
        break;
    }

    return (
      <Card>
        {item.points <= user.points && (
          <span>
            <svg
              width="145"
              height="39"
              viewBox="0 0 145 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M138.697 38.1262C138.697 38.1262 145 37.1064 145 31.9588C145 26.8117 145 0.47263 145 0.47263C145 0.47263 144.3 6.81566 138.697 6.81566H0L12.1043 23.0289L0 38.1262H138.697Z"
                fill="#E94560"
              />
            </svg>
            <svg className="lock-symbol" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0C5.67392 0 4.40215 0.526784 3.46447 1.46447C2.52678 2.40215 2 3.67392 2 5V7C1.46957 7 0.960859 7.21071 0.585786 7.58579C0.210714 7.96086 0 8.46957 0 9V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H12C12.5304 16 13.0391 15.7893 13.4142 15.4142C13.7893 15.0391 14 14.5304 14 14V9C14 8.46957 13.7893 7.96086 13.4142 7.58579C13.0391 7.21071 12.5304 7 12 7H4V5C3.99975 4.26964 4.26595 3.56428 4.74866 3.01618C5.23138 2.46809 5.89747 2.11491 6.622 2.02289C7.34654 1.93087 8.07977 2.10631 8.68417 2.51633C9.28858 2.92635 9.72266 3.54277 9.905 4.25C9.9713 4.50686 10.1369 4.72686 10.3654 4.86161C10.4786 4.92833 10.6038 4.97211 10.7338 4.99045C10.8639 5.00879 10.9963 5.00133 11.1235 4.9685C11.2507 4.93567 11.3702 4.87811 11.4751 4.79911C11.58 4.7201 11.6684 4.6212 11.7351 4.50806C11.8018 4.39491 11.8456 4.26973 11.8639 4.13966C11.8823 4.00959 11.8748 3.87719 11.842 3.75C11.5645 2.67676 10.9384 1.7261 10.062 1.04734C9.18559 0.368574 8.10852 0.000172449 7 0Z" fill="white" />
            </svg>
          </span>
        )}

        {item.points > user.points && (
          <span>
            <svg
              width="145"
              height="39"
              viewBox="0 0 145 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M138.697 38.1262C138.697 38.1262 145 37.1064 145 31.9588C145 26.8117 145 0.47263 145 0.47263C145 0.47263 144.3 6.81566 138.697 6.81566H0L12.1043 23.0289L0 38.1262H138.697Z"
                fill="#1A1A2E"
              />
            </svg>
            <svg className="lock-symbol" width="14" height="16" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.625 5.625H9.16667V3.75C9.16667 1.68182 7.52222 0 5.5 0C3.47778 0 1.83333 1.68182 1.83333 3.75V5.625H1.375C0.617228 5.625 0 6.25557 0 7.03125V13.5938C0 14.3694 0.617228 15 1.375 15H9.625C10.3828 15 11 14.3694 11 13.5938V7.03125C11 6.25557 10.3828 5.625 9.625 5.625ZM3.05559 3.75C3.05559 2.37122 4.15186 1.25004 5.5 1.25004C6.84814 1.25004 7.94441 2.37122 7.94441 3.75V5.625H3.05559V3.75Z" fill="white" />
            </svg>
          </span>
        )}

        <Label as="a" color="orange" ribbon="right">
          {item.points}
          {' '}
          Points
        </Label>

        <Image src={`${image}`} wrapped ui={false} className={`image-height ${(item.points > user.points) ? 'image-opacity' : ''}`} />

        {item.points > user.points && (
          <div className="selected-wrapper">
            <div>
              <Icon name="lock" size="big" />
            </div>
          </div>
        )}

        <Header as="h2">
          {item.serviceCode}
          <Header.Subheader>{item.serviceName}</Header.Subheader>
        </Header>
      </Card>
    );
  });

  if (rewardsData.length) {
    return (
      <Grid.Column mobile={16} tablet={15} computer={16}>
        <BRBSwiper
          pagination={{
            clickable: true,
          }}
          keyboard={{ enabled: false, onlyInViewport: false }}
          mousewheel={{ invert: false }}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          allowTouchMove
          // slidesPerView={"auto"}
          // navigation={{
          //   nextEl: "brb-swiper__nav--next",
          // }}
          slides={rewardsCards}
        />
      </Grid.Column>
    );
  }

  const teaserRewards = [
    {
      name: 'Airport fast-track',
      image: img2,
    },
    {
      name: 'Lounge access',
      image: img8,
    },
    {
      name: 'Room upgrade',
      image: img5,
    },
    {
      name: 'Free trip',
      image: img10,
    },
  ];

  return (
    <RewardsWrapper>

      <Swiper
        keyboard={{ enabled: false, onlyInViewport: false }}
        mousewheel={{ invert: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        allowTouchMove
        pagination={{ clickable: true }}
        watchOverflow
        className="my-trip-rewards"
      >

        {teaserRewards.map((reward, index) => (
          <SwiperSlide key={reward.name}>
            <RewardTile backgroundImage={reward.image} big={index === 0 || index === 3}>
              <p>{reward.name}</p>
            </RewardTile>
          </SwiperSlide>
        ))}

      </Swiper>

      <div className="overlay">
        <p>Coming soon</p>
      </div>

    </RewardsWrapper>
  );

  // return (
  //   <Message>
  //     No rewards are currently available, but you’ll still earn points and
  //     you’ll be able to redeem them later. Check back soon.
  //   </Message>
  // );
};
