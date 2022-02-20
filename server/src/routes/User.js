const express = require('express');
const router = express.Router();

const { signup, signin, getProfileInformation } = require('../controller/User');
const auth = require('../middleware/auth');
router.post('/signup', signup);
router.post('/signin', signin );

router.get('/getProfileInformation',auth, getProfileInformation);

module.exports = router;