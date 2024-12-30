const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', attendanceRoutes);
app.use('/api', studentRoutes);

// Sync database
(async () => {
    try {
        await sequelize.sync({ force: true }); // Use force: true only for development
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error.message);
    }
})();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
