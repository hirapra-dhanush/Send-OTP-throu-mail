const app = require("./index");

const server = process.env.PORT || 4000;

app.listen(server, () => {
    console.log(`opan in http://localhost/${server}`);

})