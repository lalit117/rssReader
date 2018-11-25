
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const rssParser = require('./src/rss-parser');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname+'/views'));

app.get('/', (req, res) => {
  res.render('input.pug',{title : 'Rss-Reader'});
});

app.post('/', (req, res) => {
   var url = req.body.rssUrl;
   //"http://newsimg.bbc.co.uk/shared/bsp/xsl/rss/img/news_logo.gif"
   rssParser(url)
   .then((feed)=>{
    res.render('feed.pug', {title:feed.title, items:feed.items, url:feed.image.url});
   })
   .catch((err)=>{
     res.status(400).send('Failed to fetch feed');
   });
});

app.listen(port, ()=>{
  console.log(`Server started listening on port ${port}`);
})