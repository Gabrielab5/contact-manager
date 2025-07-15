const { readContactsFromFileSync, writeContactsToFileSync } = require('../utils/fileUtils');mmm

const CONTACTS_FILE = 'contacts.json';

function loadContacts() {
  try {
    const contacts = readContactsFromFileSync(CONTACTS_FILE);
    console.log(`✓ Loaded ${contacts.length} contacts`);
    return contacts;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('✗ File not found - creating new contact list');
      return [];
    } else {
      console.error('✗ Error loading contacts:', err.message);
      return [];
    }
  }
}

function saveContacts(contacts) {
  try {
    writeContactsToFileSync(CONTACTS_FILE, contacts);
    console.log('✓ Contacts saved to contacts.json');
  } catch (err) {
    console.error('✗ Failed to save contacts:', err.message);
  }
}

function addContact(name, email, phone) {
  const contacts = loadContacts();

  const exists = contacts.some((c) => c.email === email);
  if (exists) throw new Error('Contact with this email already exists');

  contacts.push({ name, email, phone });
  console.log(`✓ Contact added: ${name}`);

  saveContacts(contacts);
}

function deleteContact(email) {
  const contacts = loadContacts();
  const index = contacts.findIndex((c) => c.email === email);

  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`);
  }

  const deleted = contacts.splice(index, 1)[0];
  console.log(`✓ Contact deleted: ${deleted.name}`);
  saveContacts(contacts);
}

function listContacts() {
  const contacts = loadContacts();
  console.log('\n=== All Contacts ===');
  if (contacts.length === 0) {
    console.log('No contacts available.');
  } else {
    contacts.forEach((c, i) => {
      console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
    });
  }
}

function searchContact(query) {
  const contacts = loadContacts();
  const lcQuery = query.toLowerCase();

  const results = contacts.filter((c) =>
    c.name.toLowerCase().includes(lcQuery) || c.email.toLowerCase().includes(lcQuery)
  );

  console.log(`\n=== Search Results for "${query}" ===`);
  if (results.length === 0) {
    console.log(`No contacts found matching "${query}"`);
  } else {
    results.forEach((c, i) => {
      console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
    });
  }
}

module.exports = {
  addContact,
  deleteContact,
  listContacts,
  searchContact,
};