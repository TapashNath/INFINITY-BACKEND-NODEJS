const express = require("express");
const Route = express.Router();
const AdminController = require("../Controller/AdminController");
const {
  category_add,
  category_edit,
  category_status,
  get_all_category,
  get_all_active_category,
  delete_category_by_id,
} = require("../Controller/CategoryController");
const {
  fature_add,
  fature_edit,
  fature_status,
  get_all_fature,
  get_all_active_fature,
  delete_fature_by_id,
} = require("../Controller/FatureController");
const {
  size_add,
  size_edit,
  size_status,
  get_all_size,
  get_all_active_size,
  delete_size_by_id,
} = require("../Controller/SizeController");


const { auth } = require("./../Middleware/Authorization");
const imageUpload = require("./../Middleware/Upload"); 

////////////////Admin Auth ///////////////
Route.post("/login", AdminController.login);
Route.post("/register", AdminController.register);

////////////////With Auth ///////////////
Route.post("/category_add", [imageUpload.single("image")], category_add); 
Route.put("/category_edit", category_edit);
Route.put("/category_status", category_status);
Route.get("/get_all_category", get_all_category);
Route.get("/get_all_active_category", get_all_active_category);
Route.put("/delete_category_by_id", delete_category_by_id);

Route.post("/fature_add", fature_add);
Route.put("/fature_edit", fature_edit);
Route.put("/fature_status", fature_status);
Route.get("/get_all_fature", get_all_fature);
Route.get("/get_all_active_fature", get_all_active_fature);
Route.put("/delete_fature_by_id", delete_fature_by_id);

Route.post("/size_add", size_add);
Route.put("/size_edit", size_edit);
Route.put("/size_status", size_status); 
Route.get("/get_all_size", get_all_size);
Route.get("/get_all_active_size", get_all_active_size);
Route.put("/delete_size_by_id", delete_size_by_id);

module.exports = Route;
