import { api } from 'utils/system';
import { Photos } from './types';

// Action types
const PHOTOS_FETCHED = 'camera/photosFetched';
const SET_PHOTO = 'camera/setPhoto';
const TOGGLE_CAMERA_MODE = 'camera/toggleCameraMode';

// Action creators
export const getPhotos = () => async (dispatch) => {
  const [error, response] = await api.get('/photos.json');

  if (!error)
    dispatch({
      type: PHOTOS_FETCHED,
      photos: response.photos
    });
};

export const pickPhoto = (dataURL) => (dispatch) =>
  dispatch({ type: SET_PHOTO, dataURL });

export const toggleCameraMode = () => (dispatch) =>
  dispatch({ type: TOGGLE_CAMERA_MODE });

// Reducer
const initialState = {
  cameraMode: 'user',
  photoTaken: false,
  photos: []
};

const setPhoto = (prevState, dataURL) => {
  const photoCopy: Photos = [...prevState.photos];
  if (prevState.photoTaken) {
    photoCopy[0].images.unshift(dataURL);
  } else {
    const date = new Date();
    photoCopy.unshift({
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
      images: [dataURL]
    });
  }
  return {
    ...prevState,
    photoTaken: true,
    photos: photoCopy
  };
};

export default function reducer(prevState = initialState, { type, photos, dataURL }) {
  switch (type) {
    case PHOTOS_FETCHED:
      return { ...prevState, photos };
    case SET_PHOTO:
      return setPhoto(prevState, dataURL);
    case TOGGLE_CAMERA_MODE:
      return {
        ...prevState,
        cameraMode: prevState.cameraMode === 'user' ? 'environment' : 'user'
      };
    default:
      return prevState;
  }
}
