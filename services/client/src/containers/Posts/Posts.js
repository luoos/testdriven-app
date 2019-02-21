import React from 'react';
import queryString from 'query-string';

import axios from '../../axios-users';
import PostTemplate from '../../components/PostTemplate/PostTemplate';
import Pagination from '../../components/UI/Pagination/Pagination';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: null,
      next: null
    }
    this.unlisten = this.props.history.listen((location) => {
      const values = queryString.parse(location.search);
      this.getPosts(values.page);
    });
    this._mount = false;
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.getPosts(values.page);
    this._mount = true;
  }

  componentWillUnmount() {
    this._mount = false;
    this.unlisten();
  }

  getPosts = (page) => {
    axios.get(`/posts?page=${page}`)
      .then(res => {
        if (!this._mount) return;
        const prev = res.data.data.prev && res.data.data.prev.match(/api\/v1(\/.+)$/)[1]
        const next = res.data.data.next && res.data.data.next.match(/api\/v1(\/.+)$/)[1]
        this.setState({
          prev: prev,
          next: next,
          posts: res.data.data.posts})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <>
        {this.state.posts && this.state.posts.map((p) => (<PostTemplate {...p} key={p.id} />))}
        <br/>
        <hr/>
        <Pagination
          prev={this.state.prev}
          next={this.state.next}
        />
      </>
    )
  }
}