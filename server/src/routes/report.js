/**
 * Express Router for reporting number API
 * Mounted on /report
 * @author JJ
 * @module Report routes
 */

const express = require("express");
const router = express.Router();
const fs = require("../utils/fs");
const deleteInstruction = require("firebase-admin").firestore.FieldValue.delete();
const unixseconds = require("unixseconds");
const { asyncWrap } = require("express-error-middlewares");

const authMiddleware = require("firebase-auth-express-middleware")({
  firebaseAdmin: require("firebase-admin"),
});

module.exports = router;
