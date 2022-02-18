import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapOptions = {
  zoom: 13,
  center: { lat: -33.336086746436386, lng: 115.66684086260487 },
  disableDefaultUI: true,
  mapTypeControl: false,
  zoomControl: true,
};

function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD7vpkxmaJPHIpR1m3_0x86fqQDIiKFdBc">
      <GoogleMap mapContainerClassName="Map" options={mapOptions}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
export default React.memo(Map);
