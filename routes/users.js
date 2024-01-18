const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserController = require('../controllers/users_controller');
const dashboardController = require('../controllers/dashboard_controller')
router.get('/',UserController.signIn);
router.get('/sign-up',UserController.signUp);

router.get('/admin-dashboard',dashboardController.adminDashboards);
router.get('/employee-dashboard/:id',dashboardController.employeeDashboard);
router.get('/destroy/:id',UserController.destroySession);
router.post('/create',UserController.create);
router.post('/create-session',
passport.authenticate('local',{failureRedirect : '/'}),
UserController.createSession
);

router.get('/sign-out',UserController.destroySessio);
module.exports = router;