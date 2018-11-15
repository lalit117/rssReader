
let Parser = require('rss-parser');
let parser = new Parser();
 
function rssParser(url) {
    return parser.parseURL(url)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return Promise.Reject(err.message);
    });
}

module.exports = rssParser;