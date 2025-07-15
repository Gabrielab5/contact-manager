const { contactService } = require('./services/contactService.js');
const { validateName, validateEmail, validatePhone, validateEmailOrName } = require('./utils/validation.js')

function commandHandler(command, args){
    try{
        switch(command){
            case 'add': {
                if (args[0] && args[1] && args[2]) contactService.add(validateName(args[0]), validateEmail(args[1]), validatePhone(args[2]))
                else throw new Error('✗ Error: Missing arguments for add command \nUsage: node contacts.js add "name" "email" "phone"')
                break
                }
            case 'search': {
                if (args) contactService.search(validateEmailOrName(args))
                else throw new Error('✗ Error: Missing email/phone number for search command \nUsage: node contacts.js search  "email" / "name"')
                break
                }
            case 'delete': {
                if (args) contactService.delete(validateEmail(args))
                else throw new Error('✗ Error: Missing email for delete command \nUsage: node contacts.js delete "email"')
                break
                }
            case 'list': contactService.list()
                break
            case 'help': help()
                break
            default:
                throw new Error(`✗ Error: Unknown command ${command}\nUsage: node contacts.js [add|list|search|delete|help] [arguments]`)
        }
    }
    catch(error){
        console.log("✗ Error:", error.message || error);
    }
}

function help(){
   console.log(`
Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"    - Add a new contact
  list                          - List all contacts
  search "query"                - Search contacts by name or email
  delete "email"                - Delete contact by email
  help                          - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"
`);
}

module.exports = { commandHandler }