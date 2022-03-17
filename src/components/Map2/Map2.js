import React, { useState, useEffect, useCallback} from "react";
import GoogleMap from "./GoogleMap";

const Map = props => {
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      props.markers.map(marker => {
        bounds.extend({
          lat: marker.latitude,
          lng: marker.longitude,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, props.markers]);
  return (
    <GoogleMap
      zoom={10}
      onLoad={onLoad}>
        {// Add your markers here}
    </GoogleMap>
  )
};
export default React.memo(Map);