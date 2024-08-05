import { latAndLngCoords } from "./assets/LatAndLngCoords";

const getRandomLatAndLng = () => {
  try {
    const randomizedIndex = Math.floor(Math.random() * latAndLngCoords.length);
    return latAndLngCoords[randomizedIndex];
  } catch (e) {
    console.error(`Error getting random lat and lng: ${e}`);
  }
};

export default getRandomLatAndLng;
