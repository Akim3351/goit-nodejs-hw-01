const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
const {argv} = yargs(arr);
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await listContacts();
            console.log(contactsList);
            break;
        
        case 'get':
            const contactToGet = await getContactById(id);
            if(!contactToGet){
                throw new Error(`Contact was not found. Id "${id}" does not exist`);
            }
            console.log(contactToGet);
            break;

        case 'add':
            const contactToAdd = await addContact({name, email, phone});
            console.log(contactToAdd);
            break;

        case 'remove':
            const contactToRemove = await removeContact(id);
            if(contactToRemove === null){
                throw new Error(`Contact was not found. Id "${id}" does not exist, or was deleted earlier`);
            }
            console.log(contactToRemove);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}


invokeAction(argv);