import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { ReactComponent as IMDBLogo } from "assets/imdb.svg";
import { ReactComponent as YoutubeLogo } from "assets/youtube.svg";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

export const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

export const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`;

export const Title = styled.h3`
  font-size: 32px;
`;

export const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

export const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

export const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const IMDBLink = styled.a`
  svg {
    width: 50px;
    height: 50px;
  }
`;

const RelatedSection = styled.div`
  height: auto;
  width: 100%;
  margin: 40px 0px;
`;

const ReleatedLabel = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  color: #fff;
`;

const BelowSection = styled(RelatedSection)`
  width: 100%;
  height: auto;
  display: flex;
`;

const RelateSection = styled.div`
  height: 20px;
  width: 85%;
  display: flex;
  align-items: center;
`;

const CollectionLink = styled(Link)``;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const RelatedLeftSection = styled.div`
  width: 50%;
  height: auto;
`;

const RelatedRightSection = styled.div`
  width: 50%;
  height: auto;
`;

const RelateName = styled.span`
  margin: 0 20px;
`;

const RelateLink = styled.a`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const RelateImage = styled.img`
  width: 20px;
`;

const DetailPresenter = ({ result, loading, error, isMovie }) =>
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
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map(
                  (genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              <IMDBLink
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${result.imdb_id}`}
              >
                <IMDBLogo />
              </IMDBLink>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <BelowSection>
            <RelatedLeftSection>
              <ReleatedLabel>Production Companies</ReleatedLabel>
              {result.production_companies.map(({ logo_path, name }, index) => {
                return (
                  <RelateSection key={index}>
                    <RelateName>{name}</RelateName>
                    {logo_path !== null && (
                      <RelateImage
                        src={`https://image.tmdb.org/t/p/original${logo_path}`}
                      />
                    )}
                  </RelateSection>
                );
              })}
            </RelatedLeftSection>
            <RelatedRightSection>
              <ReleatedLabel>Production Countries</ReleatedLabel>
              {result.production_countries.map(
                ({ name, iso_3166_1 }, index) => {
                  const iso = iso_3166_1.toLowerCase();
                  return (
                    <RelateSection key={index}>
                      <RelateName>{name}</RelateName>
                      {iso !== null && (
                        <RelateImage src={`/images/countries/${iso}.png`} />
                      )}
                    </RelateSection>
                  );
                }
              )}
            </RelatedRightSection>
          </BelowSection>
          {isMovie && (
            <BelowSection>
              <RelatedLeftSection>
                <ReleatedLabel>Videos</ReleatedLabel>
                {result.videos.results.map(
                  ({ key, name, site, type }, index) => {
                    return (
                      <RelateSection key={index}>
                        <RelateName>
                          {type} / {name}
                        </RelateName>
                        <RelateLink
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.youtube.com/watch?v=${key}`}
                        >
                          <YoutubeLogo />
                          {site === "Youtube" && <YoutubeLogo />}
                        </RelateLink>
                      </RelateSection>
                    );
                  }
                )}
              </RelatedLeftSection>
              <RelatedRightSection>
                <ReleatedLabel>Collections</ReleatedLabel>
                {result.belongs_to_collection !== null && (
                  <CollectionLink
                    to={`/collection/${result.belongs_to_collection.id}`}
                  >
                    <Poster
                      src={`https://image.tmdb.org/t/p/original${
                        result.belongs_to_collection.poster_path
                      }`}
                      style={{ width: "120px" }}
                    />
                  </CollectionLink>
                )}
                {result.belongs_to_collection === null && (
                  <span>No Collections</span>
                )}
              </RelatedRightSection>
            </BelowSection>
          )}
          {!isMovie && (
            <BelowSection>
              <RelatedLeftSection>
                <ReleatedLabel>Created By</ReleatedLabel>
                {result.created_by !== undefined &&
                  result.created_by.map(({ name }, index) => {
                    return (
                      <RelateSection key={index}>
                        <RelateName>{name}</RelateName>
                      </RelateSection>
                    );
                  })}
              </RelatedLeftSection>
              <RelatedRightSection>
                <ReleatedLabel>Seasons</ReleatedLabel>
                <div style={{ display: "flex" }}>
                  {result.seasons !== undefined &&
                    result.seasons.map(({ id, name, poster_path }) => (
                      <div
                        key={id}
                        style={{ width: "120px", textAlign: "center" }}
                      >
                        <CollectionLink to={`/show/${id}`}>
                          <Poster
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                          />
                        </CollectionLink>
                        <span>{name}</span>
                      </div>
                    ))}
                </div>
                {result.seasons === undefined && <span>No Seasons</span>}
              </RelatedRightSection>
            </BelowSection>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
