/* eslint-disable */
import React, { Suspense, useEffect, useState } from "react";
import "./Layout.css";
import {
  Input,
  Layout,
  Spin,
  Switch,
  Avatar,
  Select,
  Card,
  Menu,
  Popover,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  fetchNews,
  fetchNewsWithCategorAndSource,
  fetchNewsWithQuery,
  fetchNewsWithQueryAndSource,
  fetchSources,
} from "../api";
import { categories, newsData, newsSources } from "../constants";
import { Container, Grid } from "@material-ui/core";
import { auth, provider } from "../config";

const { Search } = Input;
const { Option } = Select;

const NewsSection = React.lazy(() => import("./NewsSection"));

const MainLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [homePage, setHomePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [isData, setIsData] = useState(true);

  const handleChangeCategory = (val) => setCategory(val);
  const handleChangeSource = (val) => setSource(val);
  const firebaseSignIn = () => {
    //auth.signInWithPopup(provider).then();
  };

  const handleSubmit = async () => {
    if (query.length) {
      const source = await fetchNewsWithQuery(query);
      if (source) {
        setNews(source?.data?.articles);
      } else {
        setLoading(false);
        setIsData(false);
      }
    }
  };

  useEffect(() => {
    const getSources = async () => {
      const source = await fetchSources();
      console.log("sources", source);
      setSources(source?.data?.sources);
    };
    const getTopNews = async () => {
      const result = await fetchNews();
      setNews(result?.data?.articles);
    };
    //getSources();
    // getTopNews();
    setNews(newsData[0]);
    //setSources(newsSources[0]);
  }, []);

  useEffect(() => {
    if (category.length) {
      setLoading(true);
      setIsData(false);
      const getNews = async () => {
        const res = await fetchNewsWithQuery(category);
        if (res?.data?.articles) {
          setNews(res?.data?.articles);
        } else setIsData(false);
        setLoading(false);
      };
      getNews();
    }
  }, [category]);

  const loadNews = (query) => {
    setHomePage(false);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost * postPerPage;
  //const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e) => setQuery(e.target.value);

  const showProfileItems = () => {
    return (
      <Menu>
        <Menu.Item>Logout</Menu.Item>
      </Menu>
    );
  };

  return (
    <Container>
      <Card bordered={false} style={{ width: "auto" }}>
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
              justifyContent: "space-between",
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
            />
            {/* <Button type="primary" onClick={firebaseSignIn}>
              Sign in
            </Button> */}

            <Popover content={showProfileItems} title="Profile">
              <Avatar
                size={34}
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
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
          <NewsSection news={news} isData={isData} />
        )}
      </Suspense>
    </Container>
  );
};

export default MainLayout;
