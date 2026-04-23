const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware")

// Importing models
const {organizationModel, userModel} = require("./models")


let BOARD_ID = 1;
let ISSUES_ID = 1;



const BOARDS = [];

const ISSUES = [];

const app = express();
app.use(express.json());

// CREATE
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // SEARCH IN DB

    const userExists = await userModel.findOne({
        username,
    });

    if (userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    const user = await userModel.create({
        username,
        password
    })

    res.json({
        message: "You have signed up successfully",
        userId: user._id
    })

})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({
        username: username,
        password: password
    });

    if (!userExists) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return 
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "lkjh098");

    res.json({
        token
    })
})

// AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/organization", authMiddleware, async(req, res) => {

    // user wants to create an organization
    const userId = req.userId;

    const newOrganization = await organizationModel.create({
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    
    res.json({
        message: "Org created",
        organizationId: newOrganization._id,
        adminId: userId
    })
})

// admint of the org wants to add a member in the org
app.post("/add-member-to-organization", authMiddleware, async(req, res) => {

    // get userId(who wants to add member, get organzationId)
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.memerUserUsername;

    const organization = await organizationModel.findOne({
        _id : organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
        username: memberUsername
    });

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }

    // await organization.updateOne({
    //     _id: organizationId
    // }, {
    //     $push: {
    //         "members": memberUser._id
    //     }
    // })

    organization.members.push(memberUser._id);
    await organization.save()

    res.json({
        message: "New member added!"
    })
})

app.post("/board", (req, res) => {
    
})

app.post("/issue", (req, res) => {
    
})

//GET endpoints
app.get("/organization", authMiddleware, async(req, res) => {
    const userId = req.userId;
    const organizationId = req.query.organizationId; // "1"


    const organization = await organizationModel.findOne({
        _id : organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    const members = await userModel.find({
        _id : organization.members
    })

    res.json({
        organization: {
            title: organization.title,
            description: organization.description,
            admin: userId,
            members: members.map(m => ({
                username: m.username,
                memberId: m._id
            }))
        }
        // {
        //     ...organization,
        //     members: organization.members.map(memberId => {
        //         const user = USERS.find(user => user.id === memberId);
        //         return {
        //             id: user.id,
        //             username: user.username
        //         }
        //     })
        // }
    })
})

app.get("/boards", (req, res) => {

    
})

app.get("/issues", (req, res) => {
    
})

app.get("/members", (req, res) => {

})


// UPDATE
app.put("/issues", (req, res) => {

})

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", authMiddleware, async(req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.memerUserUsername;

    const organization = await organizationModel.findOne({
        _id : organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
        username: memberUsername
    });

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }

    
    // await organizationModel.updateOne({
    //     _id: organizationId
    // }, {
    //     "$pullAll":{
    //         members: memberUser._id
    //     }
    // })

    organization.members = organization.members.filter(x => x.toString() !== memberUser._id.toString())
    await organization.save()

    res.json({
        message: "member deleted!"
    })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})