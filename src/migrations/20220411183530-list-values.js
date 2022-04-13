'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('lists','value', {
     type: Sequelize.STRING,
     allowNull:true
   });
     
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeColumn('lists','value');
    
  }
};
