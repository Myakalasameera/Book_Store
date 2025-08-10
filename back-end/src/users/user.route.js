const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('./user.model');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post('/admin', async (req, res) => {
    //console.log("REQ.BODY: ", req.body);
    const {userName, password} = req.body;
    try {
        const admin = await User.findOne({userName});
        if (!admin){
            res.status(404).send({message: "Admin not found."});
        }
        if (admin.password !== password){
            res.status(401).send({message: "Invalid Password!"});
        }

        const token = jwt.sign(
            {id: admin._id, userName: admin.userName, role: admin.role}, 
            JWT_SECRET,
            {expiresIn: '1h'}
        )

        return res.status(200).json({
            message: "Authentication Successful.",
            token: token,
            user: {
                userName: admin.userName,
                role: admin.role
            }
        })
    } catch (error) {
        console.error("Failed to login as admin! ", error);
        res.status(401).send({message: "Failed to login as admin."});
    }
})

// Route to fetch the currently authenticated user's info
router.get('/me', verifyAdminToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            userName: user.userName,
            role: user.role
        });
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ message: 'Failed to fetch user info' });
    }
});

module.exports = router;