'use strict';

module.exports = {
  async up (queryInterface, sequelize) {
     await queryInterface.createTable('users', 
     { 
      id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
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
     });
  
    
  },

  async down (queryInterface, sequelize) {
   
     await queryInterface.dropTable('users');
    
  }
};
