// Method GET

const { param } = require("../Routes/contactRoutes");

// public
const getcontacts = (req, res) => {
    res.status(200).json({ message: "i am get api to get all contacts" });
  }
const getcontact = (req, res) => {
    res.status(200).json({ message: `i am get api to get contact of the given id ${req.params.id}` });
  }
const createcontact = (req, res) => {
    res.status(200).json({ message: `i am post api to create contact` });
  }
const updatecontact = (req, res) => {
    res.status(200).json({ message: `i am put api to update contact of the given id ${req.params.id}` });
  }
const deletecontact = (req, res) => {
    res.status(200).json({ message: `i am delete api for delete contact of the given id ${req.params.id}` });
  }

  module.exports = {getcontacts, getcontact , createcontact , updatecontact , deletecontact}
