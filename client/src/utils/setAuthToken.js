import axios from 'axios';

const setAuthToken = (apiToken) => {
  if (apiToken) {
    axios.defaults.headers.common['x-auth-token'] = apiToken;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
