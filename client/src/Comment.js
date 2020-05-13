import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export default Comment = props => (
    <div className="singleComment">
        <img alt="user-image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`}/>
        <div className="textComment">
            <div className="singleCommentContent">
                <h3>{props.author}</h3>
                <ReactMarkdown source={props.children}/>
            </div>
            <div className="singleCommentButtons"/>
        </div>
    </div>
)

Comment.PropTypes = {
    author: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
}