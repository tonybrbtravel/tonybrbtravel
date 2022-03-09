import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { RevealedHotelDetails } from '../../../interfaces/revealedHotelType';
import './TripMap.less';

export interface Props {
  revealedHotelDetails: RevealedHotelDetails[];
}

export const TripMap: React.VFC<Props> = ({
  revealedHotelDetails,
}) => {
  const [revealedMapDetails, setRevealedMapDetails] = useState<RevealedHotelDetails[]>([]);
  useEffect(() => {
    setRevealedMapDetails(revealedHotelDetails);
  }, [revealedHotelDetails]);
  return (
    <Container>
      <div className="city-map">
        {revealedMapDetails && revealedMapDetails.map((x) => (
          <MapContainer
            center={[x.latitude, x.longitude]}
            zoom={5}
            scrollWheelZoom
            className="map"
          >
            {/* <TileLayer url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" /> */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[x.latitude, x.longitude]}>
              <Popup>
                {x.hotelName}
              </Popup>
            </Marker>
          </MapContainer>
        ))}
      </div>
    </Container>
  );
};
