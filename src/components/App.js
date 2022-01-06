/* eslint-disable */
import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Input, Spin, Switch, Avatar, Select, Card, Menu, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchNews, fetchNewsWithQuery } from "../api";
import { categories, themes } from "../constants";
import { Container, Grid } from "@material-ui/core";
import Login from "./Login";
import { logout, setTheme } from "../store/auth/actions";
import { clearData, setAllNews } from "../store/news/actions";
import Axios from "axios";

const { Search } = Input;
const { Option } = Select;

const NewsSection = React.lazy(() => import("./NewsSection"));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  const bookmarkedNews = useSelector(({ news }) => news.bookmarkNews);
  const allNews = useSelector(({ news }) => news.all);
  const theme = useSelector(({ auth }) => auth.theme);
  const name = useSelector(({ auth }) => auth.name);
  const pic = useSelector(({ auth }) => auth.profile);

  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkClicked, isBookmarkClicked] = useState(false);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [isData, setIsData] = useState(true);
  const [color, setColor] = useState(themes.light);

  const handleChangeCategory = (val) => setCategory(val);

  const handleSubmit = async () => {
    if (query.length) {
      const source = await fetchNewsWithQuery(query);
      if (source) {
        dispatch(setAllNews(source?.data?.data));
        setIsData(true);
      } else {
        setIsData(false);
      }
      setLoading(false);
    }
  };

  const getTopNews = async () => {
    const result = await fetchNews();
    if (result?.data?.articles) {
      const updatedNews = result?.data?.articles.map((item, i) => ({
        ...item,
        id: i,
        bookmark: false,
      }));
      dispatch(setAllNews(updatedNews));
    }
  };

  const checkNews = async () => {
    const result = await fetchNews();

    console.log("res", result?.data);

    // if (result?.data?.data) {
    //   const updatedNews = result?.data?.data.map((item, i) => ({
    //     ...item,
    //     id: i,
    //     bookmark: false,
    //   }));
    //   dispatch(setAllNews(updatedNews));
    // }
  };

  useEffect(() => {
    //getTopNews();
    checkNews();
  }, []);

  useEffect(() => {
    if (category.length) {
      setLoading(true);
      setIsData(false);
      const getNews = async () => {
        const res = await fetchNewsWithQuery(category);
        if (res?.data?.data) {
          dispatch(setAllNews(res?.data?.data));
          setIsData(true);
        } else setIsData(false);
        setLoading(false);
      };
      getNews();
    }
  }, [category]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost * postPerPage;
  //const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e) => setQuery(e.target.value);
  const handleChangeTheme = (val) => {
    dispatch(setTheme(val));
  };

  useEffect(() => {
    setColor(!theme ? themes.dark : themes.light);
  }, [theme]);

  const showProfileItems = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            isBookmarkClicked(!bookmarkClicked);
          }}
        >
          {bookmarkClicked ? "All news" : "Bookmarked News"}
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch(clearData());
            dispatch(logout());
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div style={{ background: color, minHeight: "100vh", maxWidth: "100%" }}>
      {token ? (
        <Container>
          <Card
            bordered={false}
            style={{
              width: "auto",
              background: !theme ? themes.dark1 : themes.lightAppBar,
            }}
          >
            <Grid
              container
              spacing={2}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={12} sm={3}>
                <Search
                  placeholder="Search News..."
                  enterButton
                  onSearch={handleSubmit}
                  onChange={handleSearch}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Select
                  style={{
                    width: 200,
                  }}
                  showSearch
                  placeholder="Select Category"
                  onChange={handleChangeCategory}
                >
                  {categories.map((source) => (
                    <Option
                      // onClick={() => loadNews(source.name)}
                      key={source}
                      value={source}
                    >
                      {source}
                    </Option>
                  ))}
                </Select>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Switch
                  checkedChildren="Light"
                  unCheckedChildren="Dark"
                  checked={theme}
                  style={{ marginRight: 10 }}
                  onChange={handleChangeTheme}
                />

                <Popover content={showProfileItems} title={name}>
                  <Avatar
                    size={34}
                    icon={<UserOutlined />}
                    style={{ cursor: "pointer" }}
                    src={pic}
                  />
                </Popover>
              </Grid>
            </Grid>
          </Card>

          <Suspense
            fallback={
              <Spin
                size="large"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              />
            }
          >
            {loading ? (
              <Spin
                size="large"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              />
            ) : (
              <NewsSection
                news={bookmarkClicked ? bookmarkedNews : allNews}
                isData={isData}
                theme={theme}
              />
            )}
          </Suspense>
        </Container>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
