/**
 * Express Router API for Searching numbers
 * Mounted on /search
 * @author JJ
 * @module Search routes
 */

const express = require("express");
const router = express.Router();
const fs = require("../utils/fs");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const incrementInstruction = FieldValue.increment(1);
const deleteInstruction = FieldValue.delete();
const { asyncWrap } = require("express-error-middlewares");

const authMiddleware = require("firebase-auth-express-middleware")({
  firebaseAdmin: require("firebase-admin"),
});

/**
 * Search for a number if it is reported before and the reasons for it
 * @name GET /search/:number
 * @returns {Object} true/false indicator, if true, returns an object of reasons and the number of times each reason is selected
 */
router.get(
  "/:number",
  asyncWrap(async (req, res) => {
    const { number } = req.params;

    const doc = await fs.collection("numbers").doc(number).get();

    res.status(200).json({
      ok: true,

      // Check if number has been reported before, and return data if it has been
      ...(doc.exists
        ? { reported: true, numOfReports: doc.data().count, reasons: [] }
        : { reported: false }),
    });
  })
);

module.exports = router;
