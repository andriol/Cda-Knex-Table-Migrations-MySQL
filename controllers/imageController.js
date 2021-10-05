const Image = require("../models/image");
const Cake = require("../models/cake");
const controller = {};

controller.view = (_req, res) => {
  Image.fetchAll()
    .then((images) => {
      res.status(200).json(images);
    })
    .catch(() => {
      res.status(400).json({ message: "Error, can't get images" });
    });
};

controller.getSingle = (req, res) => {
  Image.where({ id: req.params.id })

    .fetch({ withRelated: ["cake"] })
    .then((image) => {
      res.status(200).json({ image });
    })
    .catch(() => {
      res.status(400).json({ message: "Error, can't get image" });
    });
};

controller.save = (req, res) => {
  Cake.where({ id: req.body.cake_id })
    .fetch()
    .then(
      (cake) => {
        console.log("Cake found");
        return cake;
      },
      () => res.status(404).json({ message: "Cake not found" })
    )
    .then((cake) => {
      new Image({
        image: req.body.image,
        cake_id: cake.id,
      })
        .save()
        .then((newImage) => {
          res.status(201).json(newImage);
        });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error, can't create image",
      });
    });
};
controller.delete = (req, res) => {
  Image.where({ id: req.params.id })
    .destroy()
    .then(() => {
      res
        .status(200)
        .json({
          message: `Image with cake id ${req.params.id} deleted`,
        })
        .catch(() => {
          res.status(400).json({ message: "Error, can't delete image" });
        });
    });
};
module.exports = controller;
