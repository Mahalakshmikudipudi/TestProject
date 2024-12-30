const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Student = require('./Student');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Associate with Student
Attendance.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Attendance;
