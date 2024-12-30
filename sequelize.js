const { Sequelize } = require('sequelize');

// Configure the database connection
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',      // or your database host
    dialect: 'mysql',       // or 'postgres', 'sqlite', 'mssql'
    logging: false,         // Disable logging; set to true if you want to debug SQL queries
});

// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

module.exports = sequelize;
