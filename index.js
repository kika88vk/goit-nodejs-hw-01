import * as contactService from "./contacts.js";
import { program } from "commander";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();



const invokeAction = async ({ action, id, name, phone, email }) => {
    try {
        switch (action) {
            case "list":
                const contactList = await contactService.listContacts();
                return console.table(contactList);
            case "get":
                const oneContact = await contactService.getContactById(id);
                return console.log(oneContact);
            case "add":
                const newContact = await contactService.addContact(name, email, phone);
                return console.log(newContact);
            case "remove":
                const removeContact = await contactService.removeContact(id);
                return console.log(removeContact);
            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: "e6ywwRe4jcqxXfCZOj_1e" });
// invokeAction({ action: 'add', name: "Lui Lofaiet", email: "lui.l@gmail.com", phone: "(058) 587-5459" });
// invokeAction({ action: 'remove', id: "dYRM_17rzQSEEm4p2dQ5F" });


invokeAction(options);