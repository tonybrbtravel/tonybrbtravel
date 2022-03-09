import { Table } from 'semantic-ui-react';

export const MyPoints = () => (
  <div className="myPoints">
    {/* <Header as="h2" color="blue">
        <Header.Content>
          <strong>My</strong> Points
        </Header.Content>
      </Header> */}
    <Table className="earn-points-table" columns={4} singleLine>
      <Table.Body>
        <Table.Row textAlign="center" className="earn-points-cell">
          <Table.Cell colSpan="4" width="15">
            + Earn Points: Create A Trip
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <Table columns={4} singleLine>
      <Table.Body>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Monthly payment</Table.Cell>
          <Table.Cell>+100</Table.Cell>
          <Table.Cell>1500</Table.Cell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Upload Photo</Table.Cell>
          <Table.Cell>+100</Table.Cell>
          <Table.Cell>1400</Table.Cell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Lock Trip</Table.Cell>
          <Table.Cell>+100</Table.Cell>
          <Table.Cell>1300</Table.Cell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Claimed reward</Table.Cell>
          <Table.Cell>-2000</Table.Cell>
          <Table.Cell>1200</Table.Cell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Create trip</Table.Cell>
          <Table.Cell>+1000</Table.Cell>
          <Table.Cell>3200</Table.Cell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.Cell>21/01/2021</Table.Cell>
          <Table.Cell>Complete profile</Table.Cell>
          <Table.Cell>+600</Table.Cell>
          <Table.Cell>2200</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
);
