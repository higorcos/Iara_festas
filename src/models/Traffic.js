const sequelize = require('sequelize');
const database = require('../../src/database/config');
const ModelInventory = require('../../src/models/Inventory')

const traffic = database.define('traffic',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false, 
    },
    leased:{//alugado (quantidade)
        type: sequelize.INTEGER,
        allowNull:true,     
    },
    cost:{//custo do aluguel
        type: sequelize.INTEGER,
        allowNull:true,
    },
    date_leased:{//data do aluguel
        type: sequelize.DATE,
       // defaultValue: Date()

    },
    date_delivery:{//data de entrega
        type: sequelize.DATE,
        allowNull:true,
    }
    
})
//relacionamento de 1 para Muitos
ModelInventory.hasMany(traffic);
traffic.belongsTo(ModelInventory);

traffic.sync({force:false}); 

module.exports = traffic;