const db = require("../models");
const config = require("../config/auth.config");
const Book = db.book;
const Author = db.author;

const Op = db.Sequelize.Op;
//<-----adding books to database---->
exports.addBook = (req,res)=>{

    Book.create({
        name: req.body.name,
        publishedYear: req.body.year,
        description: req.body.description

    }).then(book=>{
        Author.findOne({
            where: {
                name: req.body.authorName
            }
        })
    }).then(author=>{
        if(!name){
            Author.create({
                name: req.body.authorName,

            })
        }
    }).then(author=> {
        book.setAuthor(author).then((book)=>{

            res.render('/addBook',{data:book})
        });

    })

}
//<------searching for BOOK--------->
exports.searchBook = (req,res)=>{
    Book.findOne({
        include:[{
            model: Author,
        }],
        where:{
            name: req.body.bookName
        }
    }).then( (result)=>{
        if(result!== null) {
            res.render('search.pug', {result: result})
        }
        else{
            const message = "Book does not exist";
            res.render('search.pug', {message1: message})
        }

    })
};
