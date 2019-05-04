import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey='AIzaSyB_2UdmRuOE-w7TlyaEAaPGT0piW6SU4hY'
        strokeWidth={3}
        strokeColor='#222'
    />
);

export default Directions;
