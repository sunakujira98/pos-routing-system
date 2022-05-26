// index 0 always lat
// index 1 always long
const extractLatLong = (latLong) => {
  return latLong.split(',') 
}

module.exports = {
  extractLatLong
}