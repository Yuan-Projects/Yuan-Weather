import axios from 'axios';

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response.statusCode = response.status;
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

global.wx = {
  request: function(options) {    
    var result = axios(options);
    if (options.success) {
      return result.then((response) => {
        options.success(response);
      });
    }
    return result;
  }
};