const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath  = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const existingContacts = await listContacts();
  const result = existingContacts.find(contact => contact.id === `${contactId}`);
  if (!result) {
    return null;
  }
  
  return result;
}

async function removeContact(contactId) {
  const existingContacts = await listContacts();
  const existingIndex = existingContacts.findIndex(contact => contact.id === `${contactId}`);
  if (existingIndex < 0) {
    return null;
  }
  const remainingContacts = existingContacts.filter(contact => contact.id !== `${contactId}`);
  await fs.writeFile(contactsPath, JSON.stringify(remainingContacts));
  return existingContacts[existingIndex];
}

async function addContact({name, email, phone}) {
  const existingContacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  }
  const newContactsArray = [...existingContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsArray));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};