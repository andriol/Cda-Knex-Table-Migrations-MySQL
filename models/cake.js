const bookshelf = require("../bookshelf");

const Cake = bookshelf.model("Cake", {
  tableName: "cakes",
  images: function () {
    return this.hasMany("Image");
  },
});

module.exports = Cake;
