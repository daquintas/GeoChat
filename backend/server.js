require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const cors = require('cors');
const Comment = require('./models/comment');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

mongoose.connect(process.env.db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
  });

router.route('/comments')   
        .get(function(req, res){
            Comment.find({}, {}, { sort: { '_id': -1 }}).limit(7).exec(function(err, comments){
                if(err) 
                    return res.json({success: false, error: err});
                else{
                    return res.json({success: true, data: comments.reverse()});
                }
            })
        })

    .post(function(req, res) {
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
        comment.save(function(err) {
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

app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));