import React, { Component } from 'react';

import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Para onde?'
                placeholderTextColor='#333'
                onPress={() => {}}
                query={{
                    key: 'AIzaSyB_2UdmRuOE-w7TlyaEAaPGT0piW6SU4hY',
                    language: 'pt'
                }} 
                textInputProp={{
                    autoCapitalize: 'none',
                    autoCorrect: false
                }}
                fetchDetails
                enablePoweredByContainer={false}
            />
        )
    }
}
