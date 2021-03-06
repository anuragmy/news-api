import axios from "axios";

const token = process.env.REACT_APP_API_TOKEN;

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

export const fetchNewsWithQuery = async (query, type) => {
  // const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`;
  // const url = `https://api.thenewsapi.com/v1/news/all?language=en&search=${query}&api_token=${api}`;
  // const url = `https://inshortsapi.vercel.app/news?category=${query}`;
  let url = `https://inshortsapi.vercel.app/news?category=${
    query === "all" ? "" : query
  }`;
  if (type === "search")
    url = `https://gnews.io/api/v4/search?q=${query}&ln=en&token=${token}`;

  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
