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


invokeAction(options);




























// node index -a list
// node index -a get -i e6ywwRe4jcqxXfCZOj_1e
// node index -a add -n Lui Lofaiet -e lui.l@gmail.com -p 058-587-5459
// node index -a remove -i Z5sbDlS7pCzNsnAHLtDJd



