import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import ptIcon from "./pt_circle.png";
import ptIconSmall from "./pt_circle_small.png";
import ptIconTiny from "./pt_circle_tiny.png";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

const mapOptions = {
  zoom: 13,
  center: { lat: -33.336086746436386, lng: 115.66684086260487 },
  disableDefaultUI: true,
  mapTypeControl: false,
  zoomControl: true,
};

export default function Map(mapprops) {
  const [markers, setMarkers] = useState([]);
  const [open, setOpen] = useState({});
  const [ages, setAgeRange] = useState([mapprops.ageRange]);
  const [diseases, setDiseases] = useState([mapprops.diseases]);
  const [mapBounds, setMapBounds] = useState({});
  const [markerIco, setMarkerIco] = useState(ptIcon);

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

    // const markerIcon = type == "cafe" ? cafe : type == "library" ? library : book;

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
    console.log(conds);

    return fetch(
      `http://localhost:2020/api/patient/markers?ageMin=${min}&ageMax=${max}&latNE=${bounds.lattop}&lngNE=${bounds.lngtop}&latSW=${bounds.latbottom}&lngSW=${bounds.lngbottom}${conds}`
    )
      .then((res) => res.json())
      .then((res) => setMarkers(res));
  };

  return (
    <div style={{ height: "88vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAM0EpxhBTHgfutHud-t7rHWimU09T95ek",
        }}
        defaultCenter={{ lat: -33.32789335612147, lng: 115.65370583665717 }}
        defaultZoom={14}
        onChange={(e) => handleBoundsChange(e)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            index={index}
            lat={marker.latlng.lat}
            lng={marker.latlng.lng}
            name={marker.fullname}
            age={marker.age}
            conditions={marker.conditions}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
