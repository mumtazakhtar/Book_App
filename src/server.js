const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//setting view engine
app.set('views','views');
app.set('view engine','pug');

//<------static files------>
app.use(express.static('public'));


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//configuring the models
const db = require("./models");
const Role = db.role;

db.sequelize.sync();

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}


//<<----------------Routes------------------>>
//<-----get index page------->
app.get('/',(req,res)=>{

    res.render('index.pug', {message:req.query.message})

});

//<-------login page--------->
app.get('/login',(req,res)=>{
    res.render('login.pug')
});

//<----profile page----->
app.get('/profile',(req,res)=>{
    res.render('profile.pug')
});

app.get('/updateProfile',(req,res)=>{
    res.render('updateProfile.pug')
});

app.get('/addBook',(req,res)=>{
    res.render('addBook.pug')
});

app.get('/search',(req,res)=>{
    res.render('search.pug')
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//logout
app.get('/logout', (req,res)=>{
    req.session.destroy(function(error) {
        if(error) {
            throw error;
        }
        res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
    })
})

// set port, listen for requests
const PORT = 8083;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
