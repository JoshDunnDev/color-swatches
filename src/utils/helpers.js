import axios from "axios";

// Constants for maximum hue and batch size
const HUE_MAX = 360;
const BATCH_SIZE = 20;

// Generates batches of HTTP requests to retrieve color data.
export const getBatches = ({ saturation, lightness }) => {
  const batches = [];
  let promiseArr = [];

  // Check if special cases exist (lightness or saturation at extremes)
  if (
    parseInt(lightness) === 0 ||
    parseInt(lightness) === 100 ||
    parseInt(saturation) === 0
  ) {
    // Create a single promise and add it to the batches array
    const promise = axios.get(createUrl(0, saturation, lightness));
    batches.push([promise]);
  } else {
    // Generate promises for each hue value
    for (let hue = 0; hue < HUE_MAX; hue++) {
      const promise = axios.get(createUrl(hue, saturation, lightness));
      promiseArr.push(promise);

      // Check if the promise batch size has reached the limit
      if (promiseArr.length === BATCH_SIZE) {
        batches.push(promiseArr);
        promiseArr = [];
      }
    }
  }

  return batches;
};

// Creates a URL for color data retrieval based on HSL values.
const createUrl = (hue, saturation, lightness) => {
  let baseUrl = "https://www.thecolorapi.com/id?hsl=hsl";
  baseUrl += `(${hue}, ${saturation}, ${lightness})`;
  return baseUrl;
};

// Convert a hexadecimal color representation to RGB format.
export const hexToRgb = hex => {
  // Use a regular expression to match and capture the three color components (R, G, B)
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  // Check if a valid match was found
  return result
    ? `rgb(${parseInt(result[1], 16)}, 
      ${parseInt(result[2], 16)}, 
      ${parseInt(result[3], 16)})`
    : null;
};
