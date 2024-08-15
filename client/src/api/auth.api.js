import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import API_BASE_URL from "../config/API.config";
import { app } from "../firebase/sdk.firebase";

export const signup = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signin`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signout = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/auth/signout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const googleOAuth = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/google-oauth`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/get/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const googleOAuthApi = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: `Could not sigin with google` };
  }
};

export const googleOAuthApiServer = async (body) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/google-oauth`,
      body,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
