const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const ApiError = require("../../../error/ApiError");
const pick = require("../../../shared/pick");
const ContactService = require("./contact.service");

const insertIntoDB = catchAsync(async (req, res) => {
  const result = await ContactService.insertIntoDB(req.body);
  console.log("result", result);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact successfully created!!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await ContactService.getAllFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact data fetched!!",
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { phone, email, location } = req.body;

  const data = {
    phone: phone === "" ? undefined : phone,
    email: email === "" ? undefined : email,
    location: location === "" ? undefined : location,
  };

  const result = await ContactService.updateOneFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact update successfully!!",
    data: result,
  });
});

const deleteIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log("deleteId", id);

  const result = await ContactService.deleteIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact delete successfully!!",
    data: result,
  });
});

const ContactController = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
};

module.exports = ContactController;
