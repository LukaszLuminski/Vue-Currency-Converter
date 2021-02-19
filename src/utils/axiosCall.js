import axios from 'axios';

function axiosCall(action, currency, data) {
  const request = {
    method: action,
    url: `http://www.floatrates.com/daily/${currency}.json`,
  };
  if (data) request.data = data;
  const call = axios(request);
  return call;
}

export default axiosCall;
