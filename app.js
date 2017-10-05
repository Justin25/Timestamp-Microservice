// Basic required imports adn stuff
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//Create instance of express
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
//Return json formatted for date
app.get('/dateValues/:dateVal', function(req,res,next){
    //Gets the date input
    var dateVal = req.params.dateVal;
    var dateFormat = ('ll');
    var dateFormattingOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    if (isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000)
        naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOptions);
    }
    if (isNaN(unixDate)) {
        naturalDate = null;
    }
    res.json({unix: unixDate, natural: naturalDate});
});
app.listen(process.env.PORT || 5000, function(){
    console.log('Working');
});
