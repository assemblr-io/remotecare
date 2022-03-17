const express = require("express");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

exports.getDistances = async function (query) {
  let org = JSON.parse(query.origins);
  let dest = JSON.parse(query.destinations);

  return client
    .distancematrix({
      params: {
        destinations: dest,
        origins: org,
        travelMode: "DRIVING",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
