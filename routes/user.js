const express = require('express');
const router = express.Router();

const User = require('../model/user.model')
const app = express()

router.get('/', async (req, res) => {
    try {
        console.log("ok")
        const users = await User.find();
        res.send(users)
    } catch (err) {
        res.send("error :" + err)
    }
})
router.post('/', async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const response = await user.save();
        res.json(response)
    } catch (err) {
        res.send("error :" + err)
    }
})
// router.post('/search/', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(req.body);
//     try {

//         const search = await User.find();
//         for (const u of search) {
//             if (email === u.email && password === u.password) {
//                 res.send(true)
//             } else {
//                 res.send(false)
//             }
//         }
//     } catch (err) {
//         res.send("error :" + err)
//     }
// })
router.post('/search/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    try {
        const search = await User.find();

        // Use a flag to track if a match is found
        let found = false;

        for (const u of search) {
            if (email === u.email && password === u.password) {
                found = true;
                break;  // Exit the loop once a match is found
            }
        }

        // Send response after the loop based on the flag
        if (found) {
            res.send(true);
        } else {
            res.send(false);
        }

    } catch (err) {
        res.status(500).send("error :" + err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const response = await user.remove();
        res.json(response);
    } catch (err) {
        res.send("error : " + err);
    }
})

module.exports = router