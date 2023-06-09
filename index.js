const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

// const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;
    case "add":
      const newContact = await addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "remove":
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "1" });
invokeAction(argv);
