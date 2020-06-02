const Sequelize = require('sequelize');

// ORM models


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

// connect models with
// const User = UserModel(sequelize, Sequelize);



// assosiations 
// User.belongsTo(Role,{foreignKey:'role_id'});


sequelize.sync({})
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    classes,
    Student,
    Role,
    Attendance
};