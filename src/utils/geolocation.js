export const getCurrentPosition = () => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 27000,
  };

  return new Promise((res, rej) => {
    if (!navigator.geolocation) {
      rej(new Error("Geolocalizzazione non supportata"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        rej(new Error(error.message));
      },
      options
    );
  });
};
