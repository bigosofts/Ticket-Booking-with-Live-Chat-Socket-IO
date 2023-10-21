const express = require("express");
const router = express.Router();

//import post controller
const postController = require("../controllers/postController");
const travelPackageController = require("../controllers/travelPackageController");
const orderPackageController = require("../controllers/orderController");
const clientProfileController = require("../controllers/clientController");
const instructorprofileController = require("../controllers/instructorController");
const loginController = require("../controllers/loginController");
const widgetController = require("../controllers/widgetController");
const messageController = require("../controllers/messageController");
const conversationController = require("../controllers/conversationController");

//Middleware Import
const passEncrypted = require("../middlewares/passwordEncryption");
const authverify = require("../middlewares/authverifyMiddleware");

//demo request for test
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express.js!" });
});

//authentication
router.get("/isAdmin", authverify, (req, res) => {
  let userName = req.headers["userName"];
  let userRole = req.headers["userRole"];
  let isAdmin = req.headers["isAdmin"];

  res.status(200).json({
    status: "Alhamdulillah",
    data: {
      userName,
      userRole,
      isAdmin,
    },
  });
});

router.post("/logout", authverify, (req, res) => {
  let userName = req.headers["userName"];
  let userRole = req.headers["userRole"];
  let isAdmin = req.headers["isAdmin"];

  res.clearCookie("token_travel").status(200).json({
    status: "Alhamdulillah",
    data: {
      userName,
      userRole,
      isAdmin,
    },
  });
});

//signup
router.post(
  "/create-client",
  passEncrypted.hashedPassword,
  clientProfileController.createClient
);

router.post(
  "/create-instructor",
  passEncrypted.hashedPassword,
  instructorprofileController.createInstructor
);

//Login api for students and teachers
router.post(
  "/client-login",
  passEncrypted.checkPasswordClient,
  loginController.clientLogin
);
router.post(
  "/instructor-login",
  passEncrypted.checkPasswordInstructor,
  loginController.instructorLogin
);

//create
router.post("/create-post", authverify, postController.createPost);
router.post(
  "/create-package",
  authverify,
  travelPackageController.createPackage
);
router.post("/create-order", authverify, orderPackageController.createOrder);
router.post("/create-widget", authverify, widgetController.createWidget);
router.post("/create-message", authverify, messageController.createMessage);
router.post(
  "/create-conversation",
  authverify,
  conversationController.createConversation
);

//read
router.post("/select-posts", authverify, postController.selectPosts);
router.post("/select-posts-public", postController.selectPosts);
router.post(
  "/select-packages",
  authverify,
  travelPackageController.selectPackages
);
router.post("/select-packages-public", travelPackageController.selectPackages);
router.post("/select-orders", authverify, orderPackageController.selectOrders);
router.post(
  "/select-clients",
  authverify,
  clientProfileController.selectClients
);
router.post(
  "/select-all-clients",
  authverify,
  clientProfileController.selectAllClients
);
router.post(
  "/select-all-clients-public",
  clientProfileController.selectAllClientsPublic
);
router.post("/select-widgets", authverify, widgetController.selectWidgets);
router.post("/select-widgets-public", widgetController.selectWidgets);
router.post("/select-messages", authverify, messageController.selectMessages);
router.post("/select-messages-public", messageController.selectMessages);
router.post(
  "/select-conversations",
  authverify,
  conversationController.selectConversations
);
router.post(
  "/select-conversations-public",
  conversationController.selectConversations
);
router.post(
  "/select-instructors",
  authverify,
  instructorprofileController.selectInstructors
);
router.post(
  "/select-all-instructors",
  authverify,
  instructorprofileController.selectAllInstructors
);
router.post(
  "/select-all-instructors-public",
  instructorprofileController.selectAllInstructorsPublic
);

//update
router.put("/update-post", authverify, postController.updatePost);
router.put(
  "/update-package",
  authverify,
  travelPackageController.updatePackage
);
router.put("/update-order", authverify, orderPackageController.updateOrder);
router.put("/update-client", authverify, clientProfileController.updateClient);
router.put(
  "/update-instructor",
  authverify,
  instructorprofileController.updateInstructor
);
router.put("/update-widget", authverify, widgetController.updateWidget);
router.put("/update-message", authverify, messageController.updateMessage);
router.put(
  "/update-conversation",
  authverify,
  conversationController.updateConversation
);

//delete
router.delete("/delete-post/:id", authverify, postController.deletePost);
router.delete(
  "/delete-package/:id",
  authverify,
  travelPackageController.deletePackage
);
router.delete(
  "/delete-client/:id",
  authverify,
  clientProfileController.deleteClient
);
router.delete(
  "/delete-instructor/:id",
  authverify,
  instructorprofileController.deleteInstructor
);
router.delete(
  "/delete-order/:id",
  authverify,
  orderPackageController.deleteOrder
);
router.delete("/delete-widget/:id", authverify, widgetController.deleteWidget);
router.delete(
  "/delete-message/:id",
  authverify,
  messageController.deleteMessage
);
router.delete(
  "/delete-conversation/:id",
  authverify,
  conversationController.deleteConversation
);

module.exports = router;
