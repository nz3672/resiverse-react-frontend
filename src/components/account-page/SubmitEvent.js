import { updateTranslist } from "../../api/Put";

export const waitForLandlordEvent = async (form, id) => {
  const response = await updateTranslist(form, id);
  return response;
};

export const waitForTenantdEvent = async (form, id) => {
  const response = await updateTranslist(form, id);
  return response;
};

export const waitMoveInEvent = async (form, id) => {
  const response = await updateTranslist(form, id);
  return response;
};

export const waitLandlordCheckInsur = async (form, id) => {
  const response = await updateTranslist(form, id);
  return response;
};

export const waitForConfirmInsur = async (form, id) => {
  const response = await updateTranslist(form, id);
  return response;
};
