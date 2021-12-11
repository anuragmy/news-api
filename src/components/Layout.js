/* eslint-disable */
import React, { Suspense, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./Layout.css";
import { Input, Layout, Menu, Spin, Switch } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  StockOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { fetchSources } from "../api";

const { Search } = Input;

const NewsSection = React.lazy(() => import("./NewsSection"));
const News = React.lazy(() => import("./News"));

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sources, setSources] = useState([]);
  const [homePage, setHomePage] = useState(true);
  const [query, setQuery] = useState("");

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const getSources = async () => {
      const sources = await fetchSources();
      if (sources) setSources(sources);
    };
    getSources();
  }, []);

  const loadNews = (query) => {
    setHomePage(false);
    setQuery(query);
  };

  const handleChangeSearch = (e) => console.log(e.target.value);
  const handleSearch = (e) => console.log(e.target.value);

  return (
    <Layout>
      {/* <Sider trigger={null} collapsible collapsed={!collapsed}>
        <div className="logo">
          <h2>{!collapsed ? "N" : "Newsio"}</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["-1"]}>
          <Menu.Item
            onClick={() => setHomePage(true)}
            key="-1"
            icon={<StockOutlined />}
          >
            Top News
          </Menu.Item>
          {sources.map((source) => (
            <Menu.Item onClick={() => loadNews(source.name)} key={source.name}>
              {source.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider> */}
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Search
            placeholder="Search News..."
            //onSearch={handleSearch}
            enterButton
            onChange={handleSearch}
            style={{ marginTop: 15, width: 400 }}
          />
          <Switch
            checkedChildren="Light"
            unCheckedChildren="Dark"
            defaultChecked
            style={{ marginLeft: "60%" }}
          />
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            paddingRight: 0,
            minHeight: 280,
          }}
        >
          <Suspense fallback={<Spin size="large" />}>
            {homePage === true ? (
              <News />
            ) : (
              <NewsSection
                category="everything"
                query={"q=" + query}
                topHeading={query}
                results="100"
              />
            )}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
