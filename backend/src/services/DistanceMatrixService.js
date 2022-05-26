const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client();

const originStore = { lat: -6.917195, lng: 107.600941 }

/* 
  origin : array,
  destination: array
*/
const getDistanceMatrix = async (origin, destination) => {
  try {
    const distanceMatrix = await client.distancematrix({
      params: {
        key: process.env.GOOGLE_MATRIX_KEY,
        origins: origin,
        destinations: destination,
        travelMode: 'DRIVING',
        unitSystem: 1,
        avoidHighways: false,
        avoidTolls: false,
      }
    })

    return distanceMatrix?.data
  } catch (error) {
    console.log("Error on distanceMatrix", error);
  }
}

module.exports = {
  getDistanceMatrix
}