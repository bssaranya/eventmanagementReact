import { jsonInstance } from './api/jsonInstance';

export const getDataFromJson = (url) => jsonInstance.get(url);
export const setDataToJson = (url, data) => jsonInstance.post(url, data);

// ******** get organisation data by id ********* //
export const getOrgById = (id) => jsonInstance.get(`organisation/${id}`);
export const editOrgData = (id, data) =>
  jsonInstance.put(`organisation/${id}`, data);

// ******** get Event data by id ********* //
export const getEventById = (id) => jsonInstance.get(`event/${id}`);
export const editEventData = (id, data) =>
  jsonInstance.put(`event/${id}`, data);
