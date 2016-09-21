// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
var db = require('./models');

/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////




////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
 db.Book.find(function(err, books){
    if (err) { return console.log("index error: " + err); }
    res.json(books);
  });
});
// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var tag ={ "_id" :req.params.id};
   //findById
    db.Book.find(tag,function(err,book) {
      if(err){ }

    res.json(book);
});

});

// create new book
app.post('/api/books', function (req, res) {
  var book = new db.Book({ title: req.body.title,
               author: req.body.author,
             });
  console.log(book)

    book.save(function(err,book){
        if(err) { }
         res.json(book);
});


});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
      //console.log(req.params);
      db.Book.findOne({"_id" :req.params.id},function(err,b) {
          if(err){ } 
            b.title = req.body.title;
            b.author = req.body.author;
             b.save(function(err,saved){
              if(err){ }
               res.json(saved);
            });
    });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
      var tag ={ "_id" :req.params.id};

       db.Book.remove(tag,function(err,book){
        console.log(tag + '   deleting: '+book)
        res.json(book);
    })

 
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
