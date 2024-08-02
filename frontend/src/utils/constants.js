export const HOST = import.meta.env.VITE_SERVER_URL; //from .env file


export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const UPDATE_USER_INFO_ROUTE = `${AUTH_ROUTES}/update-user-info`;
export const UPDATE_USER_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/update-user-profile-image`;


//cloudinary image upload/delete
export const CLOUDINARY_ROUTES = "api/cloudinary";
export const UPLOAD_IMAGE_CLOUDINARY = `${CLOUDINARY_ROUTES}/upload-image-cloudinary`;
export const DELETE_IMAGE_CLOUDINARY = `${CLOUDINARY_ROUTES}/delete-image-cloudinary`;



// subtodo
export const SUBTODO_ROUTES = "api/sub-todo";
export const ADD_SUBTODO_ROUTE = `${SUBTODO_ROUTES}/add-sub-todo` ;