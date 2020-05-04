import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_API_KEY } from 'config';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import styles from './index.module.scss';

interface Props {
  showDrawer: any;
  hideDrawer: (component: string) => void;
  showVideo: any;
}

const Map: React.SFC<Props> = ({ showDrawer, hideDrawer, showVideo }) => {
  const mapRef = useRef<any>();

  // if (!('geolocation' in navigator)) {
  //   alert('get location not supported');
  //   // return;
  //   // locationBtn.style.display = 'none';
  // }

  const setMarker = (map, lng, lat) => {
    const marker = document.createElement('div');
    marker.className = styles.marker;
    marker.onclick = openVideo;
    new mapboxgl.Marker(marker).setLngLat([lng, lat]).addTo(map);
  };

  const openVideo = () => {
    showVideo({
      videoId: 'UBX8MWYel3s',
      location: 'New York City, New York',
      time: 'Sat'
    });
    showDrawer({
      component: 'video',
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      theme: 'dark'
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = MAP_BOX_API_KEY;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lng = coords.longitude;
        const lat = coords.latitude;

        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 14
        });

        // add markers to map
        var el = document.createElement('div');
        el.className = styles.selfMarker;

        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<h3>Me</h3><p>Not Sharing Location</p>')
          )
          .addTo(map);

        // Show some dummy snaps nearby
        setMarker(map, lng - 0.005, lat + 0.003);
        setMarker(map, lng + 0.002, lat + 0.007);
        setMarker(map, lng + 0.003, lat - 0.006);
      },
      (err) => {
        console.log(err);
        alert("Couldn't fetch location, please enter manually!");
      },
      {
        timeout: 7000
      }
    );
  }, []);

  return (
    <div className={styles.map}>
      <div className={styles.inner}>
        <header>
          <Grid fluid>
            <Row middle="xs">
              <Col xs={3}>
                <Icon
                  icon="faTimesCircle"
                  onClick={() => hideDrawer('map')}
                  size="2x"
                  className="close"
                />
                <Icon
                  icon="faSearchPlus"
                  onClick={() => {}}
                  size="2x"
                  className="close"
                />
              </Col>
              <Col xs={6}>//astoria</Col>
              <Col xs={3}>
                <Icon icon="faCog" onClick={() => {}} size="2x" className="close" />
              </Col>
            </Row>
          </Grid>
        </header>
        <div ref={mapRef} className={styles.content}></div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(actions.showDrawer(drawer)),
  hideDrawer: (component) => dispatch(actions.hideDrawer(component)),
  showVideo: (video) => dispatch(actions.showVideo(video))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
