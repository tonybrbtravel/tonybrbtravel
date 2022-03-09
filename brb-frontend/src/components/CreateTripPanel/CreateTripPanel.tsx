import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Card, Grid, List, Image, Header, Modal, Form,
} from 'semantic-ui-react';

interface CreateTripPanelProps {
  title: string;
  text: string;
}

const CreateTripPanel = ({ title, text }: CreateTripPanelProps) => {
  const history = useHistory();

  const createTrip = () => {
    history.push('/add-trip');
  };

  return (
    <>
      <div className="brb-community-container">
        <div className="ui container">
          <Grid>
            <Grid.Row>
              <Grid.Column mobile="16" tablet="5" computer="5">
                <div className="drag-n-drop-container upcoming-trips" onClick={createTrip}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50px"
                      height="50px"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z"
                        fill="#E94560"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>
                      <span>
                        Start planning a new trip
                        {' '}
                        <u>here</u>
                      </span>
                    </p>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile="16" tablet="11" computer="11">
                <div className="community-subhead upcoming-trips-content">
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <button type="button" className="ui circular secondary button brb-button" onClick={createTrip}>
                    Create Trip
                  </button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid />
        </div>
      </div>
    </>
  );
};

export default CreateTripPanel;
