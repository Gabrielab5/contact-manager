const fs = require('fs');
const path = require('path');
const {
  readContactsFromFileSync,
  writeContactsToFileSync
} = require('../fileUtils');

const testFile = path.resolve('test-contacts.json');

afterEach(() => {
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile); // Clean up
  }
});

describe('fileUtils', () => {
  describe('writeContactsToFileSync and readContactsFromFileSync', () => {
    it('should write and read contacts successfully', () => {
      const contacts = [
        { name: "Test User", email: "test@example.com", phone: '555-123-4567' }
      ];

      writeContactsToFileSync(contacts, testFile);
      const result = readContactsFromFileSync(testFile);

      expect(result).toEqual(contacts);
    });

    it('should return an empty array for empty file', () => {
      fs.writeFileSync(testFile, '   '); // file with only spaces
      const result = readContactsFromFileSync(testFile);
      expect(result).toEqual([]);
    });

    it('should throw an error for invalid JSON', () => {
      fs.writeFileSync(testFile, '{ invalid json }');
      expect(() => readContactsFromFileSync(testFile)).toThrow('Corrupted contacts file. Invalid JSON.');
    });

    it('should throw an error if file is missing', () => {
      expect(() => readContactsFromFileSync('nonexistent.json')).toThrow('File not found');
    });
  });
});
