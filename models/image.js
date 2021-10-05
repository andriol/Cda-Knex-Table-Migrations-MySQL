const bookshelf = require("../bookshelf");

const Image = bookshelf.model("Image", {
  tableName: "images",
  cake: function () {
    return this.belongsTo("Cake");
  },
});

module.exports = Image;
