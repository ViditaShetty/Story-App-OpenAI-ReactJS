const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    address:{ type: String ,default:"c/3, Kohinoor Apartment ,Andheri(W)"},
    pName:{type: String ,default:"Kohinoor Apartment"},
    sellerId:{ type: String ,default:"1"},
    seller_name:{ type: String ,default:"Henry B"},
    Category:{ type: String ,default:"Apartment"},
    Price:{ type: String ,default:"20000"},
    Rooms:{ type: String ,default:"1"},
    Sq_Ft:{ type: String ,default:"20000"},
    AvailableBy:{ type: String ,default:"29July2023"},
    City:{ type: String ,default:"Mumbai"},
    State:{ type: String ,default:"Maharashtra"},
    Proof_own:{ type: String ,default:""},
    PicsCloud:{ type: String ,default:""},
    Amenities:{ type: Array ,default:["Gated","Pool","Parking"]},
    Age:{ type: String ,default:"10"},
    Furnishing:{ type: String ,default:"fully"},
  }
);

module.exports = mongoose.model("Property", PropertySchema);