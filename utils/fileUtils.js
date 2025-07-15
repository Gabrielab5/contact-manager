const fs = require('fs');
const path = require('path');

const CONTACTS_FILE = path.resolve('contacts.json');

/**
 * Reads contacts from JSON file synchronously.
 * Handles JSON parsing errors and file read issues.
 * @returns {Array} contacts
 */
function readContactsFromFileSync(filePath = CONTACTS_FILE) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    // checks if the file is empty or contains only whitespace
    if (!data.trim()) return [];

    try {
      const contacts = JSON.parse(data);
      if (!Array.isArray(contacts)) {
        throw new Error('Contacts file is not in expected format');
      }
      return contacts;
    } catch (jsonErr) {
      throw new Error('Corrupted contacts file. Invalid JSON.');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error("File not found, invalid file path.");
    }
    throw new Error(`Failed to read contacts file: ${err.message}`);
  }
}

/**
 * Writes contacts to JSON file synchronously.
 * Handles write errors and ensures directory exists.
 * @param {Array} contacts
 */
function writeContactsToFileSync(contacts, filePath = CONTACTS_FILE) {
  try {
    const json = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
  } catch (err) {
    throw new Error(`Failed to write contacts file: ${err.message}`);
  }
}

module.exports = {
  readContactsFromFileSync,
  writeContactsToFileSync
};
