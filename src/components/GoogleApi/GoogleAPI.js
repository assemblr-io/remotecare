import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

const containerStyle = {
  height: "95vh",
};

export default function GoogleAPI(mapprops) {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [mapBounds, setBounds] = useState({});
  const onLoad = useCallback((map) => setMap(map), []);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      console.log(bounds);
    }
  }, [map]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -33.32789335612147, lng: 115.65370583665717 }} onLoad={onLoad} zoom={14}>
      {/* Child components, such as markers, info windows, etc. */}
      <DistanceMatrixService
        options={{
          destinations: [{ lat: 1.296788, lng: 103.778961 }],
          origins: [{ lng: 103.780267, lat: 1.291692 }],
          travelMode: "DRIVING",
        }}
        callback={(response) => {
          // console.log(response);
        }}
      />
    </GoogleMap>
  );
}
