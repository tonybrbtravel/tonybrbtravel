import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Segment, Card, Grid, GridColumn, Header, Button, Icon, Form, Message, Loader, Dimmer,
} from 'semantic-ui-react';
import { BRBButton } from '../../components/BRBButton/BRBButton';
import { Layout } from '../../components/Layout/Layout';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const ForgotPassword = () => (
  <Layout>
    <Grid columns={2} centered stackable>
      <GridColumn width={8} className="swiper-column">
        <Grid className="swiper-container">
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h1" className="swiper-header">
                Sign In To Your BRB Account
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <h3 className="swiper-sub-header">
                Welcome back to BRB. Sign in to your account to get your travel
                sorted. You’ll earn amazing rewards and save up to 35% on your
                trips.
              </h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridColumn>
      <GridColumn width={6}>
        <ForgotPasswordForm />
        {/*  */}
      </GridColumn>
    </Grid>

  </Layout>
);
