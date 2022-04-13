const sequelize = require('sequelize')

const connection = new sequelize('Iara_festas', 'higorcosta', '23231616',{
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00',//horário  para os horário do banco de dados

})

module.exports = connection;