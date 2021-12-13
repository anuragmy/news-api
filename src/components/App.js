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
import { logout } from "../store/auth/actions";

const { Search } = Input;
const { Option } = Select;

const NewsSection = React.lazy(() => import("./NewsSection"));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  const name = useSelector(({ auth }) => auth.name);
  const pic = useSelector(({ auth }) => auth.profile);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [isData, setIsData] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [color, setColor] = useState(themes.light);

  const handleChangeCategory = (val) => setCategory(val);

  const handleSubmit = async () => {
    if (query.length) {
      const source = await fetchNewsWithQuery(query);
      if (source) {
        setNews(source?.data?.articles);
        setIsData(true);
      } else {
        setIsData(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTopNews = async () => {
      const result = await fetchNews();
      setNews(result?.data?.articles);
    };

    getTopNews();
  }, []);

  useEffect(() => {
    if (category.length) {
      setLoading(true);
      setIsData(false);
      const getNews = async () => {
        const res = await fetchNewsWithQuery(category);
        if (res?.data?.articles) {
          setNews(res?.data?.articles);
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
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  useEffect(() => {
    setColor(!theme ? themes.dark : themes.light);
  }, [theme]);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  const showProfileItems = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
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
              background: !theme ? themes.dark1 : themes.light,
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
                  defaultChecked
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
              <NewsSection news={news} isData={isData} theme={theme} />
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
