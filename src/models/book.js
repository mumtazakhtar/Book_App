module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        name: {
            type: Sequelize.STRING
        },
        publishedYear: {
            type: Sequelize.INTEGER
        },
        description:{
            type: Sequelize.TEXT
        }
    });
    return Book;

};
