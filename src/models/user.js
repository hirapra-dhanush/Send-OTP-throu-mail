const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'password mast hav 8 characters'],
        maxlength: [32, 'passeord maxim 32 characters'],
        select: false
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    Verifiedcode: {
        type: Number
    },
    VerifiedcodeExp: {
        type: Date
    },
    resetPasswordTokrn: {
        type: String,
    }
    ,
    resetPasswordTokrnExp: {
        type: Date,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})
userSchema.methods.comparePassword = async function (enteredpassword,) {
    return await bcrypt.compare(enteredpassword, this.password)
};
userSchema.methods.ganrtvarefikason = function () {
    function gnrtnamber() {
        const fast = Math.floor(Math.random() * 9) + 1;
        const reman = Math.floor(Math.random() * 100000).toString().padStart(4, 0);
        return parseInt(fast, reman)

    }
    const Verifiedcode =gnrtnamber();
    this.Verifiedcode = Verifiedcode;
    this.VerifiedcodeExp = new Date(Date.now() + 300000) // 5 minutes\

    return Verifiedcode;
 
};

const user = mongoose.model('User', userSchema)

module.exports = user;