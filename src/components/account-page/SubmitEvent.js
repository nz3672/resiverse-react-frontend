import { updateTranslist } from "../../api/Put";
import { jsonToFormData } from "../../api/Post";
export const waitForLandlordEvent = async (form, id) => {
  const formData = jsonToFormData(form);
  const response = await updateTranslist(formData, id);
  return response;
};

export const waitForTenantdEvent = async (form, id) => {
  const formData = jsonToFormData(form);
  const response = await updateTranslist(formData, id);
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
