const sequelize = require('sequelize');
const database = require('../database/config');
const ModelProducts = require('../../src/models/Products')

const inventory = database.define('inventory',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false, 
    },
    inventoryQuantity:{//(quantidade)
        type: sequelize.INTEGER,
        allowNull:true,
       // defaultValue: 1
    },
    available:{//quantidade disponível
        type: sequelize.INTEGER,
        allowNull:true,
    },
    

    
})
//relacionamento de 1 para Muitos
ModelProducts.hasMany(inventory);
inventory.belongsTo(ModelProducts);

inventory.sync({force:false});

module.exports = inventory;  