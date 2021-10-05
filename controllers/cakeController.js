const Cake = require("../models/cake");

const controller = [];

controller.view = (req, res) => {
  Cake.where({ ...req.query })
    .fetchAll({
      withRelated: ["images"],
    })
    .then((cakes) => {
      res.status(200).json(cakes);
    })

    .catch(() => res.status(400).json({ message: "Error can't get cakes" }));
};

controller.save = (req, res) => {
  const newCake = new Cake({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categories: JSON.stringify(req.body.categories),
  });

  newCake

    .save()
    .then((newCake) => {
      res.status(201).json(newCake);
    })
    .catch(() => {
      res.status(400).json({ message: "Error can't create cake" });
    });
};

controller.getSingle = (req, res) => {
  Cake.where({ id: req.params.id })
    .fetch({ withRelated: ["images"] })
    .then((cake) => {
      res.status(200).json(cake);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error, can't get cake" });
    });
};

controller.update = (req, res) => {
  Cake.where({ id: req.params.id })
    .fetch()
    .then((cake) => {
      cake
        .save({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          categories: JSON.stringify(req.body.categories),
        })
        .then((updatedCake) => {
          res.status(200).json(updatedCake);
        });
    })
    .catch(() => {
      res.status(400).json({ message: "Error, can't update cake" });
    });
};
controller.delete = (req, res) => {
  Cake.where({ id: req.params.id })
    .destroy()
    .then(() => {
      res.status(200).json({ message: `Cake ${req.params.id} deleted` });
    })
    .catch(() =>
      res
        .status(400)
        .json({ message: `Error, can't delete cake ${req.params.id}` })
    );
};
module.exports = controller;
