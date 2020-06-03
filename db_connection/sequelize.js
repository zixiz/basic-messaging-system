const Sequelize = require('sequelize');

const userModel = require('../orm_models/user');
const messageModel = require('../orm_models/message');

const sequelize = new Sequelize('messaging_sys', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = userModel(sequelize, Sequelize);
const Message = messageModel(sequelize, Sequelize);


User.hasMany(Message,{foreignKey:'reciver'});
User.hasMany(Message,{foreignKey:'sender'});


sequelize.sync({})
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Message
};