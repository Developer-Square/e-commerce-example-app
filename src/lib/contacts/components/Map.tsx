/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable tailwindcss/no-custom-classname */

import React, { Component } from 'react';

class Map extends Component {
  state = {
    defaultCenter: { lat: -1.286389, lng: 36.817223 },
    markers: [{ lat: -1.2758, lng: 36.823 }],
  };

  componentDidMount() {
    document.body.classList.add('is-map');
    this.handleAttachGoogleMap();
  }

  componentWillUnmount() {
    document.body.classList.remove('is-map');
  }

  handleAttachGoogleMap = () => {
    const { defaultCenter } = this.state;
    // @ts-ignore
    this.map = new google.maps.Map(document.getElementById('google-map'), {
      center: defaultCenter,
      zoom: 10,
    });

    setTimeout(() => {
      this.handleDrawMarkers();
    }, 2000);
  };

  handleDrawMarkers = () => {
    const { markers } = this.state;
    markers.forEach((marker) => {
      // @ts-ignore
      new google.maps.Marker({
        position: marker,
        // @ts-ignore
        map: this.map,
      });
    });
  };

  render() {
    return <div id="google-map">Map</div>;
  }
}

export default Map;
