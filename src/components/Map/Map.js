import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import ptIcon from "./pt_circle_small.png";
import ptIconSmall from "./pt_circle_tiny.png";
import ptIconTiny from "./pt_marker.png";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function Map(mapprops) {
  const [markers, setMarkers] = useState([]);
  const [open, setOpen] = useState({});
  const [mapBounds, setMapBounds] = useState({});
  const [markerIco, setMarkerIco] = useState(ptIcon);
  const [weight, setWeight] = useState(3);
  const [options, setOptions] = useState({ radius: 40, opacity: 0.65 });
  const data = [];

  useEffect(() => {
    mapprops.trigger.current = drawMarkers;
  });

  const handleTooltipClose = () => {
    setOpen({});
  };

  const handleTooltipOpen = (key) => {
    const current = {};
    current[key] = true;
    setOpen(current);
  };

  const Marker = (props) => {
    const { key, index, lat, lng, name, age, conditions } = props;

    return (
      <>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open[index]}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <div style={{ width: "100px" }}>
                  <h4>{name}</h4>
                  <p>{age}</p>
                </div>
              }
              arrow
              placement="top"
            >
              <img onClick={() => handleTooltipOpen(index)} src={markerIco}></img>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </>
    );
  };

  const handleBoundsChange = (map) => {
    let corners = {
      lattop: map.marginBounds.ne.lat,
      lngtop: map.marginBounds.ne.lng,
      latbottom: map.marginBounds.sw.lat,
      lngbottom: map.marginBounds.sw.lng,
    };
    let zoom = map.zoom;
    let rad = zoom ** 1.4;
    console.log(zoom + " " + rad);
    setOptions({ radius: rad, opacity: 0.7 });
    setMarkerIco(map.zoom > 11 ? ptIcon : map.zoom > 8 ? ptIconSmall : ptIconTiny);
    setMapBounds(corners);
    fetchMarkers(corners);
  };

  const drawMarkers = () => {
    fetchMarkers(mapBounds);
  };

  const fetchMarkers = (bounds) => {
    const min = mapprops.ageRange[0] == undefined ? 0 : mapprops.ageRange[0];
    const max = mapprops.ageRange[1] == undefined ? 115 : mapprops.ageRange[1];
    const conds = mapprops.diseases.length != 0 ? `&diseases=${mapprops.diseases.join(",")}` : "&diseases=";

    return fetch(
      `http://localhost:2020/api/patient/markers?ageMin=${min}&ageMax=${max}&latNE=${bounds.lattop}&lngNE=${bounds.lngtop}&latSW=${bounds.latbottom}&lngSW=${bounds.lngbottom}${conds}`
    )
      .then((res) => res.json())
      .then((res) => setMarkers(res));
  };

  const doHeatMap = mapprops.heatmap;
  const heatmapData = {
    positions: doHeatMap ? data : [],
    options: options,
  };

  return (
    <div style={{ height: "95vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBimsO-5HTfzRdKwgBin2iLWaHX5ubokuk",
          libraries: ["visualization"],
        }}
        defaultCenter={{ lat: -33.32789335612147, lng: 115.65370583665717 }}
        defaultZoom={14}
        onChange={(e) => handleBoundsChange(e)}
        heatmap={heatmapData}
      >
        {markers.map(
          (marker, index) => (
            data.push({ lat: marker.latlng.lat, lng: marker.latlng.lng, weight: Math.log(marker.age) * marker.conditions.length }),
            (
              <Marker
                key={index}
                index={index}
                lat={marker.latlng.lat}
                lng={marker.latlng.lng}
                name={marker.fullname}
                age={marker.age}
                conditions={marker.conditions}
              />
            )
          )
        )}
      </GoogleMapReact>
    </div>
  );
}
