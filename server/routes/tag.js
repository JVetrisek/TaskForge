const express = require('express')
const router = express.Router()

const GetAbl = require("../abl/tag/getAbl");
const ListAbl = require("../abl/tag/listAbl");
const CreateAbl = require("../abl/tag/createAbl");
const UpdateAbl = require("../abl/tag/updateAbl");
const DeleteAbl = require("../abl/tag/deleteAbl");
const ListByTaskBoardAbl = require("../abl/tag/listByTaskBoardAbl");

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

router.get("/listByTaskBoard", (req, res) => {
  ListByTaskBoardAbl(req, res);
});

module.exports = router