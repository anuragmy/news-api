/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Card, Spin, Empty } from "antd";
import { Grid, Container } from "@material-ui/core";
import Bookmark from "../assets/bookmark.png";
import Bookmarked from "../assets/bookmarked.png";
import ReactHtmlParser from "react-html-parser";
import { themes } from "../constants";
import { Helmet } from "react-helmet";
const { Meta } = Card;

const NewsSection = ({ news, isData, theme }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (news.length) {
      const modifiedNews = news.map((news) => ({ ...news, bookmark: false }));
      setData(modifiedNews);
    }
  }, [news]);

  return (
    <div>
      <Row>
        <Container style={{ marginTop: 30 }}>
          {!isData ? (
            <Empty />
          ) : (
            <Grid container spacing={2}>
              {data.length > 1 ? (
                data.map((article, key) =>
                  article.urlToImage === "" ||
                  article.urlToImage === null ? null : (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Card
                        type="inner"
                        hoverable={theme}
                        style={{
                          marginBottom: 20,
                          cursor: "pointer",
                          minHeight: 520,
                          background: theme ? "white" : themes.darkCard,
                          color: theme ? "black" : "white",
                        }}
                        cover={
                          article.urlToImage === "" ||
                          article.urlToImage === null ? null : (
                            <img
                              alt={article.title}
                              src={article.urlToImage}
                              onClick={() => window.open(article.url, "_blank")}
                            />
                          )
                        }
                        title={
                          article.source.name === "" ||
                          article.source.name === null
                            ? null
                            : "Source: " + ReactHtmlParser(article.source.name)
                        }
                        extra={
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              const vals = data;
                              vals[key].bookmark = !vals[key].bookmark;
                              setData(vals);
                            }}
                          >
                            <img
                              src={!article.bookmark ? Bookmarked : Bookmark}
                              height={18}
                            />
                          </div>
                        }
                      >
                        <div
                          style={{
                            background: theme ? "white" : themes.darkCard,
                            color: theme ? "black" : "white",
                          }}
                        >
                          <h3
                            style={{
                              color: theme ? "black" : "white",
                            }}
                          >
                            {ReactHtmlParser(article.title)}
                          </h3>
                          <Meta
                            style={{
                              color: theme ? "black" : "white",
                            }}
                            description={article.description}
                            onClick={() => window.open(article.url, "_blank")}
                          />
                          <br />
                          {article.author === "" || article.author === null
                            ? null
                            : "Author: " + article.author}
                        </div>
                      </Card>
                    </Grid>
                  )
                )
              ) : (
                <Spin size={34} />
              )}
            </Grid>
          )}
        </Container>

        {/* {data.length > 1 && <Pagination defaultCurrent={6} total={500} />} */}
      </Row>
      {data.linkText != null ? (
        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
      ) : null}
      <Helmet>
        <style type="text/css">{`
      .ant-card-meta-description {
        color: ${!theme && "grey"}
      }
    `}</style>
      </Helmet>
    </div>
  );
};

export default NewsSection;
