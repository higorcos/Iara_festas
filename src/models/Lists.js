const sequelize = require('sequelize')
const ModelProducts = require('../../src/models/Products')
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
    value:{
        type: sequelize.STRING,
        allowNull:true
      }

   
    
});
//relacionamento de 1 para Muitos


lists.sync({force:true})

module.exports = lists