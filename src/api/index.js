import axios from "axios";

// const api = "pub_27310baae2fb6a92e39ab23dc84027221ab1";
const api = "560260f27371488ea08926319cb8480f";
axios.defaults.headers.post["X-Api-Key"] = api;

//const url = "https://newsapi.org/v2";
//const url = `https://newsdata.io/api/1/news?apiKey=${api}&country=in`;
// const newsUrl =
//   "https://newsdata.io/api/1/news?apikey=pub_27310baae2fb6a92e39ab23dc84027221ab1&country=in";

//newsdata.io/api/1/news?apikey=pub_27310baae2fb6a92e39ab23dc84027221ab1

export const fetchSources = async () => {
  const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${api}`;
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNews = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`;
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNewsWithQuery = async (query) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`;
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNewsWithCategorAndSource = async (query) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`;

  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
