/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Card, Spin, Empty } from "antd";
import { useDispatch } from "react-redux";
import { Grid, Container } from "@material-ui/core";
import Bookmark from "../assets/bookmark.png";
import Bookmarked from "../assets/bookmarked.png";
import ReactHtmlParser from "react-html-parser";
import { themes } from "../constants";
import { Helmet } from "react-helmet";
import { addBookmark } from "../store/news/actions";
const { Meta } = Card;

const NewsSection = ({ news, isData, theme }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleChangeBookMark = (article, index) => {
    const vals = data;
    vals[index].bookmark = !vals[index].bookmark;
    setData(vals);
    dispatch(addBookmark(article));
  };

  useEffect(() => {
    setData(news);
  }, [news]);

  return (
    <div>
      <Row>
        <Container style={{ marginTop: 30 }}>
          {!data.length ? (
            <Empty />
          ) : (
            <Grid container spacing={2}>
              {data.map((article, key) =>
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
                        article.imageUrl === "" ||
                        article.imageUrl === null ? null : (
                          <img
                            alt={article.title}
                            src={article.imageUrl}
                            style={{
                              maxHeight: 250,
                            }}
                            onClick={() => window.open(article.url, "_blank")}
                          />
                        )
                      }
                      title={
                        article.author === "" || article.author === null
                          ? null
                          : "Author: " + ReactHtmlParser(article.author)
                      }
                      extra={
                        <div onClick={() => handleChangeBookMark(article, key)}>
                          <img
                            src={article.bookmark ? Bookmark : Bookmarked}
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
                          onClick={() => window.open(article.url, "_blank")}
                        >
                          {ReactHtmlParser(article.title)}
                        </h3>
                        <Meta
                          style={{
                            color: theme ? "black" : "white",
                          }}
                          description={article.content}
                          onClick={() =>
                            window.open(article.readMoreUrl, "_blank")
                          }
                        />
                        <br />
                        {article.date === "" || article.date === null
                          ? null
                          : "Date: " + article.date}
                        {/* {article.published_at === "" ||
                        article.published_at === null
                          ? null
                          : "Date: " +
                            new Date(article.published_at).toUTCString()} */}
                      </div>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Container>
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
