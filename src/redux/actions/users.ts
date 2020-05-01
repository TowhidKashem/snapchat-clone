import { GET_USERS } from 'redux/actions/actionTypes';
import { User } from 'types';

export const getUsers = () => async (dispatch) => {
  const response = await fetch('https://randomuser.me/api/?results=500');
  const users = await response.json();
  dispatch({
    type: GET_USERS,
    users: _parseUsers(users.results)
  });
};

const _parseUsers = (users): User[] =>
  users.map(
    ({ gender, dob, uuid, login, picture, name }): User => ({
      id: uuid,
      username: login.username,
      avatar: picture.thumbnail,
      gender,
      age: dob.age,
      fullName: `${name.first} ${name.last}`
    })
  );

// {
//   "gender": "female",
//   "name": {
//       "title": "Mrs",
//       "first": "Jasmine",
//       "last": "Anderson"
//   },
//   "location": {
//       "street": {
//           "number": 6936,
//           "name": "Arctic Way"
//       },
//       "city": "Vanier",
//       "state": "Nunavut",
//       "country": "Canada",
//       "postcode": "W4Y 8E2",
//       "coordinates": {
//           "latitude": "-65.6936",
//           "longitude": "124.3736"
//       },
//       "timezone": {
//           "offset": "+10:00",
//           "description": "Eastern Australia, Guam, Vladivostok"
//       }
//   },
//   "email": "jasmine.anderson@example.com",
//   "login": {
//       "uuid": "916fb2e9-5f8e-41c1-94b6-6b08d281a9a5",
//       "username": "greengoose763",
//       "password": "rachel",
//       "salt": "8H6eVevq",
//       "md5": "2ad5898572369cd0afd8f73a5bbe7c17",
//       "sha1": "fa195b831d3b16ed4f089a1bc445688b3833ca7d",
//       "sha256": "5059216e713d440c1449bba8af577eb6d346bc55a5f41b6e6bf59cb49bd00131"
//   },
//   "dob": {
//       "date": "1945-11-08T15:41:01.340Z",
//       "age": 75
//   },
//   "registered": {
//       "date": "2011-02-19T17:46:33.190Z",
//       "age": 9
//   },
//   "phone": "151-656-3120",
//   "cell": "580-329-4686",
//   "id": {
//       "name": "",
//       "value": null
//   },
//   "picture": {
//       "large": "https://randomuser.me/api/portraits/women/81.jpg",
//       "medium": "https://randomuser.me/api/portraits/med/women/81.jpg",
//       "thumbnail": "https://randomuser.me/api/portraits/thumb/women/81.jpg"
//   },
//   "nat": "CA"
// }
