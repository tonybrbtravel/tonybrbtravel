import axios from 'axios';
// import { Auth } from 'aws-amplify';

export const request = (baseUrl, urlSegment, method, token, payload) => axios({
  url: baseUrl + urlSegment,
  method,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  data: payload,
}).then((response) => response);

export const requestNoPayload = (baseUrl, urlSegment, method, token) => axios({
  url: baseUrl + urlSegment,
  method,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}).then((response) => response);

export const unauthorisedRequest = (baseUrl, urlSegment, method) => axios({
  url: baseUrl + urlSegment,
  method,
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response);
