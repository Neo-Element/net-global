const distance = (latitude1, longitude1, latitude2, longitude2) => {
  const lat1 = (latitude1 * Math.PI) / 180;
  const lon1 = (longitude1 * Math.PI) / 180;
  const lat2 = (latitude2 * Math.PI) / 180;
  const lon2 = (longitude2 * Math.PI) / 180;
  const distanceLat = lat2 - lat1;
  const distanceLon = lon2 - lon1;
  const a =
    Math.pow(Math.sin(distanceLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(distanceLon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371;
  console.log(c, r);
  return c * r;
};

const getRadius = (latitude, longitude, radius) => {
  const kmXDegree = 111;
  const degree = radius / kmXDegree;

  return {
    maxLat: latitude + degree,
    minLat: latitude - degree,
    maxLon: longitude + degree,
    minLon: longitude - degree,
  };
};

module.exports = { distance, getRadius };
