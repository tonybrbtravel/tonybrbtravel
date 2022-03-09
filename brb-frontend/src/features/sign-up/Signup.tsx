import { useState } from 'react';
import { Grid, Header, GridColumn } from 'semantic-ui-react';
import Swiper from 'swiper';
import BRBSwiper from '../../components/BRBSwiper';
import { slidesData } from '../../mockData/signup';
import SignUpForm from './components/SignUpForm';
import { Layout } from '../../components/Layout/Layout';
import BackgroundImage from '../../components/BackgroundImage';

const backgroundImages = [
  'Lake_Como.jpg',
  'budget-easily.png',
  'best-hotels.png',
];

export const SignUp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSlideChange = (swiper: Swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const slides = slidesData.map((slide) => (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1" className="swiper-header">
            {slide.header}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={7}>
          <p className="swiper-sub-header">{slide.subHeader}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ));

  return (
    <>

      {backgroundImages.map((img: string, index: number) => (
        <BackgroundImage
          key={img}
          src={img}
          isActive={index <= currentSlide}
        />
      ))}

      <Layout signUp>
        <Grid columns={2} centered stackable>
          <GridColumn width={8} className="swiper-column">
            <BRBSwiper
              slides={slides}
              spaceBetween={60}
              navigation={false}
              pagination={{
                clickable: true,
              }}
              onSlideChange={onSlideChange}
              allowTouchMove
            />
          </GridColumn>
          <GridColumn className="prasanna" width={6}>
            <SignUpForm />
          </GridColumn>
        </Grid>
      </Layout>

    </>
  );
};
