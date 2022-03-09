// Why is there a second file for this???
import { useRef } from 'react';
import {
  Card, Grid, Header, Icon,
} from 'semantic-ui-react';

import './TravelProfileDashboardPanel.less';
import { TravelProfileIntroCard } from '../../TravelProfile/TravelProfileIntroCard';
import BRBPinkText from '../../../components/BRBPinkText';

export const TravelProfileDashboardPanel = (props: any) => {
  const nextSection = useRef(null);
  return (
    <div className="travel-profile-dashboard">
      <div className="ui container">
        <Grid columns={2} padded>
          <Grid.Row>
            {/* <Grid.Column
            tablet={1}
            computer={1}
            only="computer tablet"
          ></Grid.Column> */}
            <Grid.Column mobile={16} tablet={15} computer={15}>
              <Header as="h2">
                <Icon name="user" />
                <Header.Content>
                  Travel
                  {' '}
                  <BRBPinkText> Profile</BRBPinkText>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {/* <Grid.Column
            tablet={1}
            computer={1}
            only="computer tablet"
          ></Grid.Column> */}
            <Grid.Column mobile={16} tablet={16} computer={7}>
              <TravelProfileIntroCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div id="travel-profile-decor">
          <div className="airport">Airports</div>
          <div className="destinations">Destinations</div>
          <div className="exclusions">Exclusions</div>
          <div className="travellers">Travellers</div>
          <div className="activities">Activities</div>
        </div>
      </div>
    </div>
  );
};
