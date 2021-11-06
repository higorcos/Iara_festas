const Sequelize = require('sequelize')
const ModelProducts = require('../../src/model/Products')
const database = require('../database/config')

const lists = database.define('lists',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
});
//relacionamento de 1 para Muitos
ModelProducts.hasMany(lists)
lists.belongsTo(ModelProducts)



lists.sync({force:true})

module.exports = lists