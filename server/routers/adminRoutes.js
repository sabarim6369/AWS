const express = require("express");
const {
  addtelecaller,
  updatetelecaller,
  deletetelecaller,
  assignleads,
  swapleads,
  addleads,
  login,
  getalltelecaller,
  getallleads,
  assignallleads,
  getadmindetails,
  getstats
} = require("../controller/admin");

const router = express.Router();

router.post("/login", (req,res)=>login(req,res,req.db));;
router.get("/getalltelecaller",(req,res)=>getalltelecaller(req,res,req.db));
router.get("/getallleads",(req,res)=>getallleads(req,res,req.db));
router.post("/add", (req, res) => addtelecaller(req, res, req.db));
router.patch("/update/:telecallerId", (req, res) => updatetelecaller(req, res, req.db));
router.delete("/delete/:telecallerId", (req, res) => deletetelecaller(req, res, req.db));
router.put("/assign-leads", (req, res) => assignleads(req, res, req.db));
router.put("/swapallleads", (req, res) => swapleads(req, res, req.db));
router.post("/addleads", (req, res) => addleads(req, res, req.db));
router.put("/assignallleads",(req,res)=>assignallleads(req,res,req.db));
router.get("/getadmindetails",(req,res)=>getadmindetails(req,res,req.db));
router.get("/getstats",(req,res)=>getstats(req,res,req.db));
module.exports = router;
