// import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Container, Header, Card, Rating,
} from 'semantic-ui-react';
import { BRBButton } from '../BRBButton/BRBButton';
import './BRBBestHotels.less';
import BrbEndPoints from '../../Api/BrbEndPoints';
import { getBRBHotelsInfo } from '../../Api/HotelApi';
import useApiQuery from '../../Hooks/ApiQuery';

export interface Props {
  onGetStartedClick?: () => void;
}

export const BRBBestHotels = ({ onGetStartedClick }: Props) => {
  // const dispatch = useDispatch();

  // const bestHotels = useSelector(
  //   (state: any) => state?.brbBestHotels?.brbBestHotels,
  // );

  // useEffect(() => {
  //   dispatch(contentfulFetchImages([]));
  // }, []);

  const { data: brbBestHotels } = useApiQuery<any>(
    BrbEndPoints.getBRBTop3Hotels,
    { url: BrbEndPoints.getBRBTop3Hotels },
    getBRBHotelsInfo,
  );

  return (
    <div className="brb_best_hotels">
      <Container>
        <div className="brb-hotels-wrap">
          <Header className="best_hotels" as="h2">
            Only The
            {' '}
            <strong>Best</strong>
            {' '}
            Hotels
          </Header>
          <Grid columns={3} stackable>
            <Grid.Row>
              {brbBestHotels?.map((data: any) => (
                <Grid.Column key={data.hotelCity + data.hotelName}>
                  <Card className="custom-card">
                    <img src={data.hotelImage} alt="card" />
                    <div className="shadow-container">
                      <Card.Content>
                        <Card.Header>{data.hotelName}</Card.Header>
                        <Card.Meta>{data.hotelCity}</Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                        <a href="xxxxxx">
                          <Rating
                            icon="star"
                            defaultRating={data.starRating}
                            maxRating={5}
                            disabled
                          />
                        </a>
                      </Card.Content>
                    </div>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Grid columns={2} stackable className="hotel-reviews-collection">
            <Grid.Row>
              <Grid.Column mobile={16} tablet={12} computer={11}>
                <p className="hotel_collection">
                  Our curated collections of top hotels ensures your stay will
                  be unforgettable.
                  {' '}
                </p>
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={4}
                computer={5}
                className="hotel-reviews-collection-btn"
              >
                <BRBButton onClick={onGetStartedClick}>Get Started</BRBButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
