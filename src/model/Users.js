const sequelize = require('sequelize')
const database = require('../database/config')

const users = database.define('users',{
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false,
      },
    name:{
        type: sequelize.STRING,
        allowNull:false
    },
    email:{
        type: sequelize.STRING,
        allowNull:false
    },
    password:{
        type: sequelize.STRING,
        allowNull: false
    }
})

users.sync({force:false})//// Vai criar a tabela quando não existir

module.exports = users