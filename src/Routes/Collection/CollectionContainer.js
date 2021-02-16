import React, { useEffect } from "react";
import { moviesApi } from "../../api";
import CollectionPresenter from "./CollectionPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: null,
      overview: null,
      parts: null,
      backdrop_path: null,
      poster_path: null,
    };
  }

  async componentDidMount() {
    const id = this.props.location.pathname.split("/")[2];
    if (id !== null) {
      try {
        const {
          data: { name, overview, parts, backdrop_path, poster_path },
        } = await moviesApi.getCollection(id);
        this.setState({ name, overview, parts, backdrop_path, poster_path });
      } catch {
        console.log("err");
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const {
      loading,
      name,
      overview,
      parts,
      backdrop_path,
      poster_path,
    } = this.state;
    return (
      <CollectionPresenter
        loading={loading}
        name={name}
        overview={overview}
        parts={parts}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
      />
    );
  }
}
