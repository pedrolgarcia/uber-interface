import React, { Component, Fragment } from "react";

import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getPixelSize } from '../../utils';

import Search from '../Search';
import Directions from '../Directions';

import markerImage from '../../assets/marker.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles';

export default class Map extends Component {
    state = {
        region: null,
        destination: null
    };

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });

                this.mapView.animateCamera(this.state.region, 3000)
            },
            () => { },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000
            }
        );
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: {lat: latitude, lng: longitude} } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text
            }
        })
    }

    render() {
        const { region, destination } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={ref => { this.mapView = ref; }}
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation={true}
                    loadingEnabled
                >
                { destination && (
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => { 
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(50),
                                        left: getPixelSize(50),
                                        right: getPixelSize(50)
                                    }
                                });
                            }}
                        />
                        <Marker 
                            coordinate={destination} 
                            anchor={{ x: 0, y: 0 }}   
                            image={markerImage} 
                        >
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker 
                            coordinate={region} 
                            anchor={{ x: 0, y: 0 }}
                        >

                            <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>{destination.title}</LocationTimeText>
                                    <LocationTimeTextSmall>{destination.title}</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                ) }
                </MapView>
                <Search onLocationSelected={this.handleLocationSelected} />
            </View>
        );
    }
}
