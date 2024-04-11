const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routes/category')

// Base ----------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Port ----------------------------------------------
const port = 8080;

// Router---------------------------------------------
const taskBoardRouter = require("./routes/taskBoard");
const categoryRouter = require("./routes/category");
//const taskRouter = require("./routes/task")
const tagRouter = require("./routes/tag")

app.use('/taskBoard', taskBoardRouter);
app.use('/category', categoryRouter);
//app.use('/task', taskRouter);
app.use('/tag', tagRouter);

// Server is running --------------------------------
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})