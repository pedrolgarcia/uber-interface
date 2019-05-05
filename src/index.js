import React, { Fragment } from 'react';

import { StatusBar } from 'react-native';
import Map from './components/Map';

const App = () => (
    <Fragment>
        <StatusBar 
            barStyle="light-content"
            backgroundColor="#000"
        />
        <Map />
    </Fragment>
);

export default App;
