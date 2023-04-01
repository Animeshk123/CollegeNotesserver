const express = require("express");
const collegeRouter = express.Router();
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const collegeList = path.join(__dirname, "../list/list.json");

collegeRouter.post("/college", (req, res) => {
  const {
    collegeName,
    collegeCity,
    collegeCode,
    collegePhoto,
    collegeState,
    collegeCountry,
  } = req.body;
  try {
    fs.readFile(collegeList, "utf8", (error, data) => {
      if (error) return res.status(400).json({ error: error.message });
      const newCollegeList = {
        id: v4() + collegeCode,
        collegeName,
        collegeCity,
        collegeCode,
        collegePhoto,
        collegeState,
        collegeCountry,
      };
      const newData = JSON.parse(data);
      newData.push(newCollegeList);
      fs.writeFile(collegeList, JSON.stringify(newData), (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({
          status: "created",
          message: "Your College is Registered Now",
        });
      });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
});

collegeRouter.get("/colleges", (req, res) => {
  try {
    res.status(200).sendFile(collegeList);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
});

module.exports = collegeRouter;
