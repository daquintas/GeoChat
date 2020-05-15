import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios';


import './CommentBox.css';

class CommmentBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            author: '',
            text: ''
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

    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change);
    }

    submitComment = (e) => {
        e.preventDefault();
        console.log(this.state.author);
        axios.post("http://localhost:3001/api/comments", {
            author: this.state.author,
            text: this.state.text
        })
        .then((res) => {
                    if(!res.success){
                    this.setState({error: res.error});
                }
                else{
                    this.setState({author:'', text: '', error: null});
                }
            })
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
                    <h2>Anon GeoChat</h2>
                    <CommentList data={this.state.data} />
                </div>
                <div className="form">
                    <CommentForm author={this.state.author} text={this.state.text} handleChangeText = {this.handleChange} submitComment={this.submitComment}/>
                </div>
            </div>
        );
    }
}


export default CommmentBox;