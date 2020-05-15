import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = props => (
    <form onSubmit={props.submitComment}>
        <input type="text" name="author" placeholder="Your name" value={props.author} onChange={props.handleChangeText} autoComplete="off"/>
        <input type="text" name="text" placeholder="Say something..." value={props.text} onChange={props.handleChangeText} autoComplete="off"/>
        <button type="submit">Submit</button>
    </form>
);

CommentForm.propTypes ={
    // submitContent: PropTypes.func.isRequired,
    // handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    author: PropTypes.string,
};

CommentForm.defaultProps = {
    text:'',
    author: '',
};

export default CommentForm;