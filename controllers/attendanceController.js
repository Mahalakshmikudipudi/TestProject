const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { Op } = require('sequelize');

// Mark attendance for students
exports.markAttendance = async (req, res) => {
    const { date, attendance } = req.body; // attendance is an array of { student_id, status }
    try {
        for (let record of attendance) {
            await Attendance.create({
                student_id: record.student_id,
                date,
                status: record.status,
            });
        }
        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch attendance report for a specific date
exports.getDailyReport = async (req, res) => {
    const { date } = req.params;
    try {
        const report = await Attendance.findAll({
            where: { date },
            include: [Student],
        });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch cumulative attendance report
exports.getCumulativeReport = async (req, res) => {
    try {
        const students = await Student.findAll();
        const report = [];
        for (let student of students) {
            const totalDays = await Attendance.count({ where: { student_id: student.id } });
            const presentDays = await Attendance.count({ where: { student_id: student.id, status: 'Present' } });
            const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
            report.push({
                student_name: student.name,
                totalDays,
                presentDays,
                percentage,
            });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch attendance for a specific date
exports.searchAttendanceByDate = async (req, res) => {
    const { date } = req.query;
    try {
        const report = await Attendance.findAll({
            where: { date },
            include: [Student],
        });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
