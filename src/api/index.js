import axios from "axios";

const api = process.env.REACT_APP_API_KEY;
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
