module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }

    });
    return Author;

};
