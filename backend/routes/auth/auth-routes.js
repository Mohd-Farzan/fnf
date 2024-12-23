const express = require('express');
const {
  signupUser,loginUser,logoutUser,AuthMiddleware,} = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Route for checking authentication
router.get('/checkauth', AuthMiddleware, (req, res) => {
  res.json({ success: true, user: { id: res?._id, userName: req?.userName} });
});

module.exports = router;
