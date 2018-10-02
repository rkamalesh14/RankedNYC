import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = initialCenter;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );
      this.map = new maps.Map(node, mapConfig);
      console.log(this.props.selected.data);
      if (this.props.selected.data) {
        this.props.selected.data.forEach(el => {
          const marker = new maps.Marker({
            position: el.location,
            map: this.map,
            title: el.name,
            animation: maps.Animation.DROP,
          });

          const infowindow = new google.maps.InfoWindow({
            content: `<h3>${el.title} | ${el.list}</h3>
            <h5>${el.neighborhood}</h5>
            <h5>${el.address}</h5>
            <a href=${el.url} target="_blank"asdf>Open in Google Maps</a>
            <p>${el.description}</p>
            `,
          });
          marker.addListener('click', function() {
            infowindow.open(this.map, marker);
          });
        });
      }
      // let location = new google.maps.InfoWindow();

      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     var pos = {
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude,
      //     };

      //     location.setPosition(pos);
      //     location.setContent('Location found.');
      //     location.open(this.map);
      //     this.map.setCenter(pos);
      //   });
      // }
    }
  }

  render() {
    const style = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      display: 'inherit',
      top: 0,
      width: '100%',
      height: '100%',
    };
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <div ref="map" style={style}>
          Loading map...
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
};

Map.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 40.738,
    lng: -73.983,
  },
};

const mapStateToProps = state => ({
  lists: state.user.lists,
  selected: state.user.selected,
});

export default connect(mapStateToProps, null)(Map);
