import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Map from './Map.jsx';

// ...

export class Container extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '100%',
    };
    return (
      <div className="map">
        <Map google={this.props.google} style={style} visible />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBzIx1pJZBmjspYxcQp3g24Tfb4gPhlQWw',
})(Container);
