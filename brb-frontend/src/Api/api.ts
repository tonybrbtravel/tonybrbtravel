import { Auth } from 'aws-amplify';
import axios, { Method } from 'axios';

export interface ApiParams {
  url: string;
  [key: string]: any;
}

const getApiUrlFromPath = (path?: string): string => {
  const firstPart = path?.replace(/^\//, '').split('/')[0];
  const url = process.env[`REACT_APP_${firstPart?.toUpperCase()}_URL`];
  return (url || process.env.REACT_APP_API_URL) as string;
};

export const getBrbApi = async <TRESPONSE, TDATA>(
  params: ApiParams,
  method: Method,
  data?: TDATA,
) => {
  const session: any = await Auth.currentSession();
  const instance = axios.create({
    baseURL: getApiUrlFromPath(params.url),
    headers: { Authorization: `Bearer ${session.idToken.jwtToken}` },
  });
  const response = await instance.request<TRESPONSE>({
    method,
    url: params.url,
    data,
  });
  return response.data;
};

export const getBrbApiBeforeAuth = async <TRESPONSE, TDATA>(
  params: ApiParams,
  method: Method,
  data?: TDATA,
) => {
  const instance = axios.create({ baseURL: getApiUrlFromPath(params.url) });
  const response = await instance.request<TRESPONSE>({
    method,
    url: params.url,
    data,
  });
  return response.data;
};

export const SignOut = async () => {
  try {
    await Auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.log('error signing out: ', error);
    return false;
  }
};

export const getBrbFileApi = async <TRESPONSE, TDATA>(
  params: ApiParams,
  method: Method,
  data?: TDATA,
) => {
  const session: any = await Auth.currentSession();
  const instance = axios.create({
    baseURL: getApiUrlFromPath(params.url),
    headers: {
      Authorization: `Bearer ${session.idToken.jwtToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  const response = await instance.request<TRESPONSE>({
    method,
    url: params.url,
    data,
  });
  return response.data;
};

export const ForgotPasswordVerifyCode = async (email: string) => {
  try {
    return await Auth.forgotPassword(email);
  } catch (error) {
    console.log('error signing out: ', error);
    return false;
  }
};

export const UpdateConfirmPassword = async (email: string, code: string, password: string) => {
  try {
    return await Auth.forgotPasswordSubmit(
      email,
      code,
      password,
    );
  } catch (error) {
    console.log('error signing out: ', error);
    return error;
  }
};
