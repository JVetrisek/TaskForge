const express = require('express')
const router = express.Router()

const GetAbl = require("../abl/task/getAbl");
const ListAbl = require("../abl/task/listAbl");
const CreateAbl = require("../abl/task/createAbl");
const UpdateAbl = require("../abl/task/updateAbl");
const DeleteAbl = require("../abl/task/deleteAbl");
const ListByCategoryAbl = require("../abl/task/listByCategoryAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.get("/listByCategory", (req, res) => {
  ListByCategoryAbl(req, res);
});

module.exports = router