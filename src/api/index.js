import axios from "axios";

const api = process.env.REACT_APP_API_TOKEN;
axios.defaults.headers.post["X-Api-Key"] = api;

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
  // const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`;
  const url = "https://inshortsapi.vercel.app/news?category=all";
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchNewsWithQuery = async (query) => {
  // const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`;
  // const url = `https://api.thenewsapi.com/v1/news/all?language=en&search=${query}&api_token=${api}`;
  const url = `https://inshortsapi.vercel.app/news?category=${query}`;

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
