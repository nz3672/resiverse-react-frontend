import { getDetails } from "use-places-autocomplete";
export const getPlaceDetails = async (parameter) => {
  let placeDetails = await getDetails(parameter);
  return placeDetails;
};
