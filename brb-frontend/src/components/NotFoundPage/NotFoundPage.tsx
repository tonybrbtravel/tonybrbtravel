import { Card, Grid } from 'semantic-ui-react';

export const NotFoundPage = () => (
  <Grid centered columns={3}>
    <Grid.Column>
      <Card>Sorry, could not find that page.</Card>
    </Grid.Column>
  </Grid>
);
