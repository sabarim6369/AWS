const express = require("express");
const {
  addadmin,
  updateadmin,
  deleteadmin,
  pauseadmin,
  superadminlogin,
  addsuperadmin,
  getadmindetails,
  getsuperadmindata
} = require("../controller/superadmin");

const router = express.Router();

router.post("/add", (req, res) => addadmin(req, res, req.db));
router.post("/addsuperadmin",(req,res)=>addsuperadmin(req,res,req.db));
router.post("/login", (req, res) => superadminlogin(req, res, req.db));
router.patch("/update/:adminId", (req, res) => updateadmin(req, res, req.db));
router.delete("/delete/:adminId", (req, res) => deleteadmin(req, res, req.db));
router.patch("/pause/:adminId", (req, res) => pauseadmin(req, res, req.db));
router.get("/getadmins",(req,res)=>getadmindetails(req,res,req.db));
router.get("/getsuperadmindata/:superadminId",(req,res)=>getsuperadmindata(req,res,req.db));
module.exports = router;
