require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose= require('mongoose');

const Comment = require('./models/comment');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

router.get('/', function(req, res){
    res.json({message: 'Hello world'});
});

router.get('/comments', (req, res) => {
    Comment.find((err, comments) => {
        if(err) 
            return res.json({success: false, error: err});
        else{
            return res.json({success: true, data: comments});
        }
    })
});

router.post('/comments', (req, res) => {
    const comment = new Comment();
    const {author, text} = req.body;
    if(!author || !text){
        return res.json({
            success: false,
            error: 'You must provide author and comment'
        })
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if(err){
            return res.json({
                success: false,
                error: err
            })
        }
        else{
            return res.json({
                success: true
            })
        }
    })
});

app.get('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));