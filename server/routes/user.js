const express = require('express');
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const ListAbl = require("../abl/user/listAbl");

router.get("/get", (req, res) => {
    GetAbl(req, res);
});

router.get("/list", (req, res) => {
    ListAbl(req, res);
});

module.exports = router;