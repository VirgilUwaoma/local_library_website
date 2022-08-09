var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(() => {
  var fullname = "";
  if (this.first_name && this.familiy) {
    fullname = this.first_name + ", " + this.familiy;
  }
  if (!this.first_name || this.familiy) {
    fullname = "";
  }
  return fullname;
});

AuthorSchema.virtual("lifespan").get(() => {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getFullYear().toString();
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getFullYear();
  }
  return lifetime_string;
});

AuthorSchema.virtual("url").get(() => "/catalog/author/" + this._id);

module.exports = mongoose.model("Author", AuthorSchema);
