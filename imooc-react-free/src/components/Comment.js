import React from 'react';
import CommentList from './CommentList';
import CommentBox from './CommentBox';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [ 'this is my first reply' ],
    };

    this.addComment = this.addComment.bind(this);
  }

  addComment(comment) {
    this.setState({
      comments: [...this.state.comments, comment],
    });
  }

  render() {
    const { comments} = this.state;
    
    return (
      <div>
        <CommentList comments={ comments } />
        <CommentBox
          commentsLength={ comments.length }
          onAddComment={ this.addComment }
        />
      </div>
    );
  }
}

export default Comment;
