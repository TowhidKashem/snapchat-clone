import { api } from 'utils/system';
import { Photos } from 'features/Camera/types';

// Action types
const SET_PHOTOS = 'SET_PHOTOS';
const SET_PHOTO = 'SET_PHOTO';

// Action creators
export const getPhotos = () => async (dispatch) => {
  const [error, response] = await api.get('/photos.json');

  if (!error)
    dispatch({
      type: SET_PHOTOS,
      photos: response.photos
    });
};

export const setPhoto = (dataURL) => (dispatch) => dispatch({ type: SET_PHOTO, dataURL });

// Reducer
const initialState = {
  photoTaken: false,
  photos: []
};

export default function reducer(prevState = initialState, { type, photos, dataURL }) {
  switch (type) {
    case SET_PHOTOS:
      return { ...prevState, photos };
    case SET_PHOTO:
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
    default:
      return prevState;
  }
}
