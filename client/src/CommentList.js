import React from 'react';
import PropTypes from 'prop-types';
import CommentBox from './CommentBox';
import Comment from './Comment';

const CommentList = (props) => (
    Array.from(props.data.data).map(function(comment){
        return(
            <Comment author={comment.author} key={comment._id} id={comment._id}>
                {comment.text}
            </Comment> 
            )
    })
);

// CommentList.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.shape({
//         author: PropTypes.string,
//         id: PropTypes.string,
//         text: PropTypes.string
//     }))
// }

CommentList.defaultProps = {
    data: []
}

export default CommentList;