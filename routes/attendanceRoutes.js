const express = require('express');
const {
    markAttendance,
    getDailyReport,
    getCumulativeReport,
    searchAttendanceByDate,
} = require('../controllers/attendanceController');

const router = express.Router();

// Mark attendance
router.post('/attendance', markAttendance);

// Get daily attendance report
router.get('/attendance/:date', getDailyReport);

// Get cumulative attendance report
router.get('/attendance-report', getCumulativeReport);

// Search attendance by date
router.get('/attendance/search', searchAttendanceByDate);

module.exports = router;
