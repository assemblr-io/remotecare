import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import ptIcon from "./ptOrg_L.png";
import ptIconSmall from "./ptOrg_M.png";
import ptIconTiny from "./pt_marker.png";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DistanceService from "./utils.js"

export default function Map(mapprops) {
  const [markers, setMarkers] = useState([]);
  const [ageRange, setAgeRange] = useState([0, 115]);
  const [conditions, setConditions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState({});
  const [mapBounds, setMapBounds] = useState({});
  const [markerIco, setMarkerIco] = useState(ptIcon);
  const [weight, setWeight] = useState(3);
  const [options, setOptions] = useState({ radius: 40, opacity: 0.65 });
  const [zoomLvl, setZoom] = useState(14);
  const data = [];
  let workingMap;
  let googleMaps;

  const handleTooltipClose = () => {
    setOpen({});
    mapprops.ptTooltip({ id: "", key: false });
  };

  const handleTooltipOpen = (key, id) => {
    const current = {};
    current[key] = true;
    setOpen(current);
    mapprops.ptTooltip({ id: id, key: true });
  };

  const Marker = (props) => {
    const { key, index, lat, lng, name, age, conditions, id } = props;

    return (
      <>
        <ClickAwayListener onClickAway={handleTooltipClose} key={key}>
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
                <div style={{ width: "100px" }} id={id}>
                  <h4>{name}</h4>
                  <p>{age}</p>
                </div>
              }
              arrow
              placement="top"
            >
              <img
                onClick={() => handleTooltipOpen(index, id)}
                src={markerIco}
                width={zoomLvl}
                style={{ position: "absolute", transform: "translate(-48%,-58%)" }}
              ></img>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </>
    );
  };

  const handleBoundsChange = (ages, dis = []) => {
    setAgeRange(ages);
    setConditions(dis);
    let corners = {
      lattop: workingMap.marginBounds.ne.lat,
      lngtop: workingMap.marginBounds.ne.lng,
      latbottom: workingMap.marginBounds.sw.lat,
      lngbottom: workingMap.marginBounds.sw.lng,
    };
    setZoom(workingMap.zoom);
    let zoom = workingMap.zoom;
    let rad = zoom ** 1.55;

    setOptions({ radius: rad, opacity: 0.7 });
    setMarkerIco(zoom > 11 ? ptIcon : zoom > 8 ? ptIconSmall : ptIconTiny);

    const min = ages[0] === undefined ? 0 : ages[0];
    const max = ages[1] === undefined ? 115 : ages[1];
    const conds = dis.length !== 0 ? `&diseases=${dis.join(",")}` : "&diseases=";

    let request =  {
      origins: ["20 Gibson St, South Bunbury WA 6230", "54 Stockley Rd, Bunbury WA 6230"],
      destinations: [{
        lat: -33.35661033966308,
        lng:  115.64092024094921
    }, {
        lat: -32.066713137449916, 
        lng: 115.84644894861471
    }],
      travelMode: 'DRIVING',
    };


 
    console.log(workingMap)
    return fetch(
      `http://localhost:2020/api/patient/markers?ageMin=${min}&ageMax=${max}&latNE=${corners.lattop}&lngNE=${corners.lngtop}&latSW=${corners.latbottom}&lngSW=${corners.lngbottom}${conds}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMarkers(res);
        return res;
      })
      .then((res) => mapprops.pt(res));

      
  };
  

  const doHeatMap = mapprops.heatmap;
  const heatmapData = {
    positions: doHeatMap ? data : [],
    options: options,
  };

  function handleApiLoaded(map, maps){
    googleMaps = new maps.DistanceMatrixService();
  }


  //"AIzaSyBimsO-5HTfzRdKwgBin2iLWaHX5ubokuk"
  return (
    <div style={{ height: "95vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          libraries: ["visualization"],
          
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        defaultCenter={{ lat: -33.32789335612147, lng: 115.65370583665717 }}
        defaultZoom={14}
        onChange={(e) => {
          workingMap = e;
          handleBoundsChange(ageRange, conditions);
          mapprops.onDiseases.current = handleBoundsChange;
        }}
        heatmap={heatmapData}
        onLoad={(e) => {
          workingMap = e;
          mapprops.onDiseases.current = handleBoundsChange;
        }}
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
                id={marker._id}
              />
            )
          )
        )}
      </GoogleMapReact>
    </div>
  );
}
