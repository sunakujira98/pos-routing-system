const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client();

const origin1 = { lat: -6.917195, lng: 107.600941 };
const destinationA = { lat: -6.917238, lng: 107.602200 }
const destinationB = { lat: -6.957636, lng: 107.598232 }

/* 
  origin : array,
  destination: array
*/
const getDistanceMatrix = (origin, destination) => {
  client.distancematrix({
    params: {
      key: process.env.GOOGLE_MATRIX_KEY,
      origins: [origin1],
      destinations: [destinationA, destinationB],
      travelMode: 'DRIVING',
      unitSystem: 1,
      avoidHighways: false,
      avoidTolls: false,
    }
  }).then((response) => {
    return response.data
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
}

module.exports = {
  getDistanceMatrix
}