import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import {
  Container,
  Backdrop,
  Content,
  Cover,
  Data,
  Title,
  Overview,
} from "Routes/Detail/DetailPresenter";
import { Link } from "react-router-dom";

const PartDiv = styled.div`
  display: flex;
  margin: 20px 0px;
  height: auto;
`;

const PartPoster = styled.img`
  width: 120px;
`;

const PartDesc = styled.div`
  margin-left: 20px;
  width: 100%;
`;

const PTitle = styled.div`
  margin-bottom: 20px;
`;
const POverview = styled.div``;

const CollectionPresenter = ({
  loading,
  name,
  overview,
  parts,
  backdrop_path,
  poster_path,
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{name}</Title>
          <Overview style={{ marginTop: "40px" }}>{overview}</Overview>
          {console.log(parts)}
          {parts.map(({ id, title, overview, release_date, poster_path }) => (
            <PartDiv key={id}>
              <Link style={{ display: "flex" }} to={`/movie/${id}`}>
                <PartPoster
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                />
                <PartDesc>
                  <PTitle>
                    {title}
                    {release_date && ` / ${release_date}`}
                  </PTitle>
                  <POverview>{overview}</POverview>
                </PartDesc>
              </Link>
            </PartDiv>
          ))}
        </Data>
      </Content>
    </Container>
  );

export default CollectionPresenter;
