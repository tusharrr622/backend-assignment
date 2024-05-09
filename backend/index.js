require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const UserModel = require('./models/User');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser)

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(404).json(error)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ username });
        if (!userDoc) {
            return res.status(400).json('Invalid username or password')
        }
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, function (err, token) {
                if (err) {
                    console.error('JWT sign error:', err);
                    return res.status(500).json('Error creating token');
                }
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username
                })
            })
        } else {
            res.status(400).json('Invalid username or password')
        }
    } catch (error) {
        console.error('Login endpoint error:', error);
        res.status(500).json('An error occurred during login');
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
