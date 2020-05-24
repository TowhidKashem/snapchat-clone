export const snapCoordinates = (lat, lon) => [
  {
    lat: lat - 0.005,
    lon: lon + 0.005
  },
  {
    lat: lat - 0.003,
    lon: lon - 0.005
  },
  {
    lat: lat - 0.01,
    lon: lon - 0.002
  },
  {
    lat: lat + 0.007,
    lon: lon + 0.005
  },
  {
    lat: lat + 0.003,
    lon: lon - 0.0
  },
  {
    lat: lat + 0.007,
    lon: lon - 0.007
  }
];
