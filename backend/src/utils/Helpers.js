// index 0 always lat
// index 1 always long
const getLat = (latLong) => {
  return parseFloat(latLong.split(',')[0], 10)
}

const getLng = (latLong) => {
  return parseFloat(latLong.split(',')[1], 10)
}

module.exports = {
  getLat,
  getLng
}