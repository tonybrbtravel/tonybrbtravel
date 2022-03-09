import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Card, Image, Container,
} from 'semantic-ui-react';

import { contentfulReviews } from '../../Contentful/contentfulSlice';
import { IUserReviews } from '../../interfaces/myAccountType';

import star1 from '../../images/star-1.svg';
import star2 from '../../images/star-2.svg';
import star3 from '../../images/star-3.svg';
import star4 from '../../images/star-4.svg';
import star5 from '../../images/star-5.svg';

import './BRBReviews.less';

const starRatings = [star1, star2, star3, star4, star5];

export const BRBReviews = () => {
  const dispatch = useDispatch();
  const brbReviews: IUserReviews[] = useSelector((state: any) => state?.contentful.reviews);
  useEffect(() => {
    dispatch(contentfulReviews());
  }, []);

  return (
    <div className="blue-bg trust-pilot-wrap">
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column
              mobile={16}
              tablet={10}
              computer={7}
              className="trust_pilot"
            >
              <h2 className="banner-heading">
                It’s Travel As
                {' '}
                <br className="hide-in-mobile" />
                You Like It, We
                {' '}
                <br className="hide-in-mobile" />
                {' '}
                Just
                {' '}
                <strong>Sort It.</strong>
              </h2>
              <p>We love what we do and it shows in our reviews.</p>
              <div className="text-center-m">
                <a
                  href="https://uk.trustpilot.com/review/berightback.travel"
                  target="_blank"
                  className="btn-common btn-primary"
                  rel="noreferrer"
                >
                  Read More TrustPilot Reviews
                </a>
              </div>
            </Grid.Column>

            <Grid.Column mobile={16} tablet={6} computer={9}>
              <Card.Group>
                {brbReviews
                  && brbReviews?.map((data: IUserReviews) => {
                    const image = starRatings[data.rating - 1] || false;
                    return (
                      <Card className="reviews" key={data.name + data.title}>
                        <Card.Content>
                          <Card.Header>
                            {data.name}
                            {image && (
                              <Image
                                src={`${image}`}
                                size="small"
                                style={{ float: 'right' }}
                              />
                            )}
                          </Card.Header>
                          <Card.Meta>{data.title}</Card.Meta>
                          <Card.Description>
                            <div title={data.text} className="review_description">
                              {data.text && data.text}
                            </div>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    );
                  })}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
