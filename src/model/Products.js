const sequelize = require('sequelize');
const database = require('../../src/database/config')

const products = database.define('products',{

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
    color:{
        type: sequelize.STRING,
        allowNull:true,
     },
    size:{
        type: sequelize.STRING,
        allowNull:true,
    },
    value:{
        type: sequelize.INTEGER,
        allowNull:true,
    },
    inventory_mode:{
        type: sequelize.BOOLEAN,
        //allowNull:false,
        defaultValue: false
    },
    category:{
        type: sequelize.STRING,
        allowNull:true,
    },
    description:{
        type: sequelize.STRING,
        allowNull:true,
    }, 
    img:{
        type: sequelize.BLOB,
        allowNull:true,
    } 


})
products.sync({force:false})

module.exports = products
