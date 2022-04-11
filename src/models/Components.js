const sequelize = require('sequelize')
const ModelProducts = require('./Products')
const ModelLists = require('./Lists')
const database = require('../database/config')

const components = database.define('components',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
    },
    amount:{
        type: sequelize.INTEGER,
        allowNull:false,
    }
});
//relacionamento de 1 para Muitos
ModelProducts.hasMany(components)
components.belongsTo(ModelProducts)

//relacionamento de 1 para Muitos
ModelLists.hasMany(components)
components.belongsTo(ModelLists)



components.sync({force:false})

module.exports = components