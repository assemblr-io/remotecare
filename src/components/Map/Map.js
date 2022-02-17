import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const center = {
  lat: -33.336086746436386,
  lng: 115.66684086260487,
};

function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD7vpkxmaJPHIpR1m3_0x86fqQDIiKFdBc">
      <GoogleMap mapContainerClassName="Map" center={center} zoom={14}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
////{process.env.GPCMAPS_API}>
export default React.memo(Map);
