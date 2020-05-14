import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import 'whatwg-fetch';

import './CommentBox.css';

class CommmentBox extends Component{

    constructor(){
        super();
        this.state = {
            data: [],
            author: '',
            text: '',
            error: ''
        };
        this.pollInterval = null;
    }

    componentDidMount(){
        this.loadComments();
        if(!this.pollInterval){
            this.pollInterval = setInterval(this.loadComments, 2000);
        }
    }

    componentWillMount(){
        if(this.pollInterval){
            clearInterval(this.pollInterval);
        }
        this.pollInterval = null;
    }

    loadComments = () => {
        fetch('/api/comments')
            .then(data => data.json())
            .then( res => {
                if(!res.success){
                    this.setState({error: res.error});
                }
                else{
                    this.setState({data: res.data});
                }
            });
    }

    render(){
        return(
            <div className="container">
                <div className="comments">
                    <h2>Comments</h2>
                    <CommentList data={this.state.data} />
                </div>
                <div className="form">
                    <CommentForm author={this.state.author} text={this.state.text}/>
                </div>
            </div>
        );
    }
}

export default CommmentBox;