/**
 * Express Router for reporting number API
 * Mounted on /report
 * @author JJ
 * @module Report routes
 */

const express = require("express");
const router = express.Router();
const fs = require("../utils/fs");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const incrementInstruction = FieldValue.increment(1);
const deleteInstruction = FieldValue.delete();
const unixseconds = require("unixseconds");
const { asyncWrap } = require("express-error-middlewares");

const authMiddleware = require("firebase-auth-express-middleware")({
  firebaseAdmin: require("firebase-admin"),
});

/**
 * Report a number and a reason for reporting it
 * @name POST /report
 * @returns Sucess indicator
 */
router.post(
  "/",
  express.json(),
  asyncWrap(async (req, res) => {
    // Read number from request body
    const { number, reasonID } = req.body;

    // Get ref to the Doc which is used both to check if it exists and to write data to it later on
    const docRef = fs.collection("numbers").doc(number);

    // READ the doc to check if it exists, EXTREMELY STUPID, but firebase cannot check for exists without a full read....
    // See: https://www.reddit.com/r/Firebase/comments/fqxr3y/check_if_document_exists_without_reading_it/
    const doc = await docRef.get();

    // Check if this number has been reported before
    // If doc no exists means first time being reported, so create the doc plus a counter value of 1
    if (!doc.exists)
      await docRef.set({
        counter: 1,
        // reason: { [reasonID]: incrementInstruction },
      });
    else
      await docRef.update({
        counter: incrementInstruction,
        // reason: { [reasonID]: incrementInstruction },
      });

    res.status(200).json({ ok: true });
  })
);

module.exports = router;
