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
const unixseconds = require("unixseconds");
const { asyncWrap } = require("express-error-middlewares");

// Report a number by updating the specific number's document, or create a new doc for it
async function reportNumber(num) {
  // Get ref to the Doc which is used both to check if it exists and to write data to it later on
  const docRef = fs.collection("numbers").doc(num);

  // READ the doc to check if it exists, EXTREMELY STUPID, but firebase cannot check for exists without a full read....
  // See: https://www.reddit.com/r/Firebase/comments/fqxr3y/check_if_document_exists_without_reading_it/
  const doc = await docRef.get();

  // Check if this number has been reported before
  // If doc no exists means first time being reported, so create the doc plus a reported value of 1
  if (!doc.exists) await docRef.set({ reported: 1 });
  else await docRef.update({ reported: incrementInstruction });
}

// Add a report/reason for why the number is reported in the reports collection
const addReason = async (num, by, reason) =>
  fs.collection("reports").add({
    num,
    by,

    // Strip white spaces from both end of reason string
    reason: reason.trim(),

    // Store the reporting time in unix seconds (this is the time of the server executing the code)
    time: unixseconds(),
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
    // Read number and reason for reporting from request body
    const { num, by, reason } = req.body;

    await reportNumber(num);
    await addReason(num, by, reason);

    res.status(200).json({ ok: true });
  })
);

module.exports = router;
