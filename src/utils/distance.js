// USIAMO LA FORMULA DI HAVERSINE PER CALCOLARE LA DISTANZA DA PUNTO A PUNTO

export function takeDistance(latA, lonA, latB, lonB) {
  const R = 6371; // RAGGIO TERRA IN KM , CI SERVE PER POI CONVERTIRE I RAD. IN KM

  // CONVERTIAMO I GRADI IN RADIANTI
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const difLat = deg2rad(latB - latA);
  const difLon = deg2rad(lonB - lonA);

  const haversine =
    Math.sin(difLat / 2) * Math.sin(difLat / 2) +
    Math.cos(deg2rad(latA)) *
      Math.cos(deg2rad(latB)) *
      Math.sin(difLon / 2) *
      Math.sin(difLon / 2);

  const center = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  const distance = R * center;
  return distance;
}

// FORMATTAZIONE DISTANZA
export function formatDistance(km) {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  } else if (km < 10) {
    return `${km.toFixed(1)}km`;
  } else {
    return `${Math.round(km)}km`;
  }
}
