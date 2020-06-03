module.exports = (sequelize, type) => {
    return sequelize.define('message', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender: type.INTEGER,
        reciver: type.INTEGER,
        message: type.STRING,
        subject: type.STRING,
        deleted: type.BOOLEAN
    })
}