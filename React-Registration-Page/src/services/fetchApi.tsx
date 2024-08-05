

const API_URL = 'https://api-example.com/signup';

const fetchApi = async (requestOption: RequestInit) => {
    return await fetch(API_URL, requestOption);
}

export default fetchApi;