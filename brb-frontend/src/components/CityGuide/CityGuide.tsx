import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import {
  Container, Grid, Header, Image, Icon, Card,
} from 'semantic-ui-react';
import BRBPinkText from '../BRBPinkText';
import { CityGuideType } from '../../interfaces/cityGuideType';

import { contentfulCityBlogs } from '../../Contentful/contentfulSlice';

import './CityGuide.less';

SwiperCore.use([Pagination]);

export const CityGuide = () => {
  const dispatch = useDispatch();
  const cityBlogs: CityGuideType[] = useSelector((state: any) => state.contentful.cityBlogs);

  const slides = useMemo(() => cityBlogs.map((x: any, index: number) => (
    <SwiperSlide key={x.slug}>
      <a href={`${process.env.REACT_APP_MARKETING_WEBSITE}articles/${x.slug}`} target="_blank" rel="noreferrer">
        <Card>
          <Image className="city-image" src={x.heroImage} />
          <Card.Content>
            <p className="city-header">
              {x.title}
            </p>
            <p className="city-sub-header">
              {x.shortDescription}
            </p>
            <p className="city-category">
              {x.author}
              {' '}
              /
              {' '}
              {format(new Date(x.createdAt), 'dd.MM.yy')}
            </p>
          </Card.Content>
        </Card>
      </a>
    </SwiperSlide>
  )), [cityBlogs]);

  return (
    <div className="city-guide">
      <Container>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as="h2">
                <Icon className="map marker alternate" />
                <Header.Content>
                  Your
                  {' '}
                  <BRBPinkText> City</BRBPinkText>
                  {' '}
                  Guides
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={9} computer={9}>
              <p>
                Each BRB designation is tried and tested by the BRB team and all
                our recommendations are unpacked into these 48-hour city guides.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Swiper
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                spaceBetween={10}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                  },
                  1360: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 30,
                  },
                }}
              >
                {slides}
              </Swiper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
