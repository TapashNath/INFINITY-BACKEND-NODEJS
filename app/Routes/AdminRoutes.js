const express = require("express");
const Route = express.Router();
const AdminController = require("../Controller/AdminController");
const CategoryController = require("../Controller/CategoryController");
const { auth } = require("./../Middleware/Authorization");



////////////////Admin Auth ///////////////
Route.post("/login", AdminController.login);
Route.post("/register", AdminController.register);

////////////////With Auth ///////////////
Route.post("/category_add",auth,  CategoryController.category_add);

module.exports = Route;
