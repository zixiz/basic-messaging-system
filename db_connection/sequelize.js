const Sequelize = require('sequelize');

const userModel = require('../orm_models/userModel');
const messageModel = require('../orm_models/messageModel');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = userModel(sequelize, Sequelize);
const Message = messageModel(sequelize, Sequelize);


Message.belongsTo(User,{foreignKey:'reciver'});
Message.belongsTo(User,{foreignKey:'sender'});


sequelize.sync({})
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Message,
    sequelize
};