import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

interface Props {
  showMarker?: boolean;
  lat: number;
  lng: number;

  googleMapURL: string;
  loadingElement: string;
  containerElement: string;
  mapElement: string;
}

const Map: React.SFC<Props> = ({ lat, lng, showMarker }) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
    {showMarker && <Marker position={{ lat, lng }} />}
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
