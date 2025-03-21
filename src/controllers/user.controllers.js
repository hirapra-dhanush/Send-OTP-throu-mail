const catchAsyncError = require('../Middlewares/catchAsyncError');
const { Errormiddle, Errorhandler } = require('../Middlewares/error');
const user = require('../models/user');
const sendemail = require('../utils/sendemail');

const createUser = catchAsyncError(async (req, res) => {
    try {
        const { name, email, phone, password, verificationMethod } = req.body;
        if (!name || !email || !phone || !password || !verificationMethod) {
            return next(new Errorhandler("all fields are required", 400));
        }
        function verifyphon(phone) {
            const phonregex = /^\+91\d(9)$/
            return phonregex.test(phone);
        }
        if (!verifyphon(phone)) {
            return next(new Errorhandler("Invalid Phone number", 400));
        }
        const userExist = await user.findOne({
            $or: [
                { email, accountVerified: true },
                { phone, accountVerified: true }
            ]
        });

        if (userExist) {
            return next(new Errorhandler("User already exists", 400));
        }

        const registrationUser = await user.findOne({
            $or: [
                { email, accountVerified: false },
                { phone, accountVerified: false }
            ]
        });

        if (registrationUser.length >= 3) {
            return next(new Errorhandler("you hav exsidded namber of attemts (3)", 400));
        }

        const newUser = new user({
            name,
            email,
            phone,
            password,
        })
        const user = await user.create(newUser);
        const Verifiedcode = await user.ganrtvarefikason();
        await user.save();
        sendvarefikasoncode(verificationMethod, Verifiedcode, email, phone);
        res.status(201).json({
            success: true,

        });

    } catch (error) {
        next(error);
    }
})

async function sendvarefikasoncode(verificationMethod, Verifiedcode, email) {
    try {
        if (verificationMethod === "email") {
            const masseg = gatemailtamplat(Verifiedcode);
            sendemail({ email, subject: "your vari fikason code", masseg })
        } else {
            throw new Errorhandler('invalid varification method', 500)
        }
    } catch (error) {
        throw new Errorhandler('fald to varifikason code', 500)
    }

}

function gatemailtamplat(Verifiedcode) {
    return (
        `<div>
        <p>halo coders ${Verifiedcode}</p>
        </div> 
        
        `
    )

}

module.exports = createUser;