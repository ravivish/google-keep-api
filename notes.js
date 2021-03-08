const express = require("express");
const { nanoid } = require("nanoid");

const appdata = require("./appdata");

const router = express.Router();

router.get("/", (req, res) => {
  const data = [];
  appdata.forEach((element) => {
    data.push({
      id: element.id,
      title: element.title,
      body: element.body,
      pinnedstatus: element.pinnedstatus,
      created_at: element.created_at,
      updated_at: element.updated_at,
    });
  });
  res.status(200).send(data);
});

router.post("/", (req, res) => {
  const data = {};
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(404).send({ message: "send valid data" });
  } else {
    try {
      const shortid = nanoid(5);
      data.id = shortid;
      data.title = req.body.title;
      data.body = req.body.body;
      (data.pinnedstatus = req.body.pinnedstatus),
        (data.created_at = new Date());
      data.updated_at = new Date();
      appdata.push(data);
      res.status(200).send({ id: shortid });
    } catch (error) {
      res.status(404).send({ message: "send valid data" });
    }
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id.substr(1);
  const notes = appdata.find((i) => i.id === id);
  if(notes){
    res.status(200).send(notes);
  }else{
    res.status(404).send({message: "no note found"});
  }
});

router.patch("/:id", (req, res) => {
  const id = req.params.id.substr(1);
  const notes = appdata.find((i) => i.id === id);
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(404).send({ message: "send valid data" });
  } else {
    if (notes) {
      notes.title = req.body.title;
      notes.body = req.body.body;
      notes.pinnedstatus = req.body.pinnedstatus;
      notes.updated_at = new Date();
      res.status(204).send({});
    } else {
      res.status(404).send({ message: "no note found" });
    }
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id.substr(1);
  const index = appdata.findIndex((o) => o.id === id);
  if (index !== -1) appdata.splice(index, 1);
  res.status(204).send({});
});

module.exports = router;
