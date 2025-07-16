const { addContact, deleteContact, searchContact, listContacts } = require('./contactService');

// Mock file reading/writing to avoid using the real file system
jest.mock('../utils/fileUtils', () => ({
  readContactsFromFileSync: jest.fn(),
  writeContactsToFileSync: jest.fn(),
}));

const { readContactsFromFileSync, writeContactsToFileSync } = require('../utils/fileUtils');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('addContact', () => {
  it('adds a new contact', () => {
    readContactsFromFileSync.mockReturnValue([]);

    addContact('Jane Doe', 'jane@example.com', '555-1111');

    expect(writeContactsToFileSync).toHaveBeenCalledWith(
      [{ name: 'Jane Doe', email: 'jane@example.com', phone: '555-1111' }],
      'contacts.json'
    );
  });

  it('throws error if email already exists', () => {
    readContactsFromFileSync.mockReturnValue([
      { name: 'Jane Doe', email: 'jane@example.com', phone: '555-1111' }
    ]);

    expect(() =>
      addContact('Jane 2', 'jane@example.com', '555-2222')
    ).toThrow('Contact with this email already exists');
  });
});

describe('deleteContact', () => {
  it('deletes a contact by email', () => {
    readContactsFromFileSync.mockReturnValue([
      { name: 'Jane Doe', email: 'jane@example.com', phone: '555-1111' }
    ]);

    deleteContact('jane@example.com');

    expect(writeContactsToFileSync).toHaveBeenCalledWith([], 'contacts.json');
  });

  it('throws error if contact not found', () => {
    readContactsFromFileSync.mockReturnValue([]);

    expect(() => deleteContact('none@example.com')).toThrow(
      'No contact found with email: none@example.com'
    );
  });
});

describe('searchContact', () => {
  it('prints matching contact', () => {
    readContactsFromFileSync.mockReturnValue([
      { name: 'John Doe', email: 'john@example.com', phone: '1234' }
    ]);

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    searchContact('john');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('john'));
    logSpy.mockRestore();
  });
});

describe('listContacts', () => {
  it('prints all contacts', () => {
    readContactsFromFileSync.mockReturnValue([
      { name: 'John', email: 'john@example.com', phone: '123' }
    ]);

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    listContacts();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('John'));
    logSpy.mockRestore();
  });
});
