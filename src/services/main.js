import axios from 'axios';

const responseSuccessHandler = response => {
    return response.data;
  };
  
const responseErrorHandler = error => {
    var errors = ["Something went wrong, please try again!"];

    if (error.response) {
        if (error.response.data.errors)
        errors = error.response.data.errors;
        if (error.response.data.error)
        errors = [error.response.data.error];
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }

    return Promise.reject({
        status: error.response.status,
        errors: errors
    });
}

axios.interceptors.response.use(
response => responseSuccessHandler(response),
error => responseErrorHandler(error)
);

export const METRICS_API = axios.create(
    {
        baseURL: 'http://127.0.0.1:5000',
        headers: {
        get: {
            Accept: 'application/json'
        },
        post: {
            Accept: 'application/json'
        }
        }
    }
);
