const mongoose = require('mongoose')

const DB = () => {

    mongoose.connect(`${process.env.DB_CONACT}/${process.env.DB_NAME}`).then(
        () => console.log("mongoose connected successfully")
    )
        .catch((err) => console.log("mongodb is not conact ", err))
}

module.exports = DB;