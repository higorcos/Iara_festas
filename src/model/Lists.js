const sequelize = require('sequelize')
const ModelProducts = require('../../src/model/Products')
const database = require('../database/config')

const lists = database.define('lists',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
    },
    name:{
        type: sequelize.STRING,
        allowNull:false
    },
    
});
//relacionamento de 1 para Muitos


lists.sync({force:false})

module.exports = lists