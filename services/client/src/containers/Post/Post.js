import React from 'react';

import PostTemplate from '../../components/PostTemplate/PostTemplate';
import axios from '../../axios-users';


export default class Post extends React.Component {
  state = {
    loaded: false
  }

  constructor(props) {
    super(props);
    this.getPost.bind(this);
  }
  
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.getPost(postId)
  }

  getPost(postId) {
    axios.get(`/post/${postId}`)
      .then(res => {
        this.setState({
          post: {...res.data.data},
          loaded: true
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    let post = this.state.loaded ? 
      <PostTemplate {...this.state.post} title_clickable={false} /> : <div>Loading...</div>

    return (post)
  }
}