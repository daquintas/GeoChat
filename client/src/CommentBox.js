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
            text: '',
            city: ''
        };
        this.pollInterval = null;
    }

    componentDidMount(){
        this.getCity();
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
        if(this.state.author == "" || this.state.text == "" || this.state.city == ""){
            return;
        }
        else{
            axios.post("http://localhost:3001/api/comments", {
                author: this.state.author,
                text: this.state.text,
                city: this.state.city
            })
            .then((res) => {
                        if(!res.success){
                        this.setState({error: res.error});
                    }
                
                    this.setState({author:'', text: '', city: '', error: null});
            })
        }
    }

    getCity = () => {
        fetch('https://geoip-db.com/json')
        .then(res => res.json())
        .then(json => {
            axios.get('http://free.ipwhois.io/json/'+json.IPv4)
            .then(res => {
                this.setState({city: res.data.city});        
            }
        )}) 
      } 

    loadComments = () => {
        axios.get("http://localhost:3001/api/comments", {
            params: {
                city: this.state.city
            }
        })
            .then( res => {
                if(res.sucess==false){
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
                    {this.state.data.data &&
                        <CommentList data={this.state.data} />
                    }
                </div>
                <div className="form">
                    <CommentForm author={this.state.author} text={this.state.text} handleChangeText = {this.handleChange} submitComment={this.submitComment}/>
                </div>
            </div>
        );
    }
}


export default CommmentBox;