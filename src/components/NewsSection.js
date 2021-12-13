/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Divider,
  Card,
  Pagination,
  Tooltip,
  Spin,
  Empty,
} from "antd";
import { Grid, Container } from "@material-ui/core";
import { HighlightOutlined, HighlightFilled } from "@ant-design/icons";
import { fetchNews } from "../api";
import ReactHtmlParser from "react-html-parser";
const { Meta } = Card;

const NewsSection = ({ news, isData }) => {
  const [newsSection, setNewsSection] = useState([]);

  return (
    <div>
      <Row>
        <Container>
          {!isData ? (
            <Empty />
          ) : (
            <Grid container spacing={2}>
              {news.length > 1 ? (
                news.map((article, key) =>
                  article.urlToImage === "" ||
                  article.urlToImage === null ? null : (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Card
                        type="inner"
                        hoverable="true"
                        style={{
                          marginBottom: 20,
                          cursor: "pointer",
                          minHeight: 520,
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
                          <div>
                            <Tooltip
                              placement="topLeft"
                              title={
                                article.bookmark ? "Bookmarked" : "Bookmark"
                              }
                            >
                              {article.bookmark ? (
                                <HighlightFilled
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("clicked");
                                    const vals = newsSection;
                                    vals[key].bookmark = vals[key].bookmark
                                      ? false
                                      : true;
                                    setNewsSection(vals);
                                  }}
                                />
                              ) : (
                                <HighlightOutlined
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("clicked");
                                    const vals = newsSection;
                                    vals[key].bookmark = vals[key].bookmark
                                      ? false
                                      : true;
                                    console.log(vals);
                                    setNewsSection(vals);
                                  }}
                                />
                              )}
                            </Tooltip>
                          </div>
                        }
                      >
                        <h3>{ReactHtmlParser(article.title)}</h3>
                        <Meta
                          description={ReactHtmlParser(article.description)}
                          onClick={() => window.open(article.url, "_blank")}
                        />
                        <br />
                        {article.author === "" || article.author === null
                          ? null
                          : "Author: " + article.author}
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

        {newsSection.length > 1 && (
          <Pagination defaultCurrent={6} total={500} />
        )}
      </Row>
      {news.linkText != null ? (
        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default NewsSection;
