const express = require("express");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const {username, password, firstName, lastName} = req.body;
    console.log(username, password, firstName, lastName);
    const { success } = signupBody.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message: "Invalid inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        res.status(411).json({
            message: "user already exists"
        });
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })

    const userID = user._id;
    const token = jwt.sign({
        userID
    }, JWT_SECRET);

    await Account.create({
        userID,
        balance: 1 + Math.random() * 10000
    })

    res.status(201).json({
        message: "user created successfuly",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success) {
        return req.status(411).json({
            message: "Invalid inputs"
        });
    }
    
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(user) {
        const token = jwt.sign({
            userID : user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })

        return;
    }

    res.status(411).json({
        message: "error while logging in"
    })
})

const updateUserBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateUserBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Error while updating the information"
        });
    }

    await User.updateOne(req.body, {
        _id: req.userID
    })

    res.status(201).json({
        message: "Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try{
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })
    
        res.json({
            user: users.map(user => ({
                // username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                // _id: user._id,
            }))
        })
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        })
    }
})

module.exports = router;