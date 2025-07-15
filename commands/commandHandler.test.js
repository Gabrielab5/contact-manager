const { commandHandler } = require('./commandHandler.js')
const { contactService } = require('./services/contactService.js')
const { validateName, validateEmail, validatePhone, validateEmailOrPhone } = require('./utils/validation.js')
jest.mock('./services/contactService.js');
jest.mock('./utils/validation.js');

describe('commandHandler', () => {
    let consoleLogSpy;
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    describe('add command', () => {
        it('should call contactService.add with validated arguments', () => {
            const args = ['John Doe', 'john@example.com', '1234567890'];
            
            validateName.mockReturnValue(args[0]);
            validateEmail.mockReturnValue(args[1]);
            validatePhone.mockReturnValue(args[2]);

            commandHandler('add', args);

            expect(validateName).toHaveBeenCalledWith('John Doe');
            expect(validateEmail).toHaveBeenCalledWith('john@example.com');
            expect(validatePhone).toHaveBeenCalledWith('1234567890');
            expect(contactService.add).toHaveBeenCalledWith('John Doe', 'john@example.com', '1234567890');
        });

        it('should log an error if arguments for "add" are missing', () => {
            commandHandler('add', ['John Doe']); 

            expect(console.log).toHaveBeenCalledWith("✗ Error:", expect.stringContaining('Missing arguments for add command'));
            expect(contactService.add).not.toHaveBeenCalled();
        });
    });


    describe('search command', () => {
        it('should call contactService.search with a validated query', () => {
            const query = 'john@example.com';
            validateEmailOrPhone.mockReturnValue(query);

            commandHandler('search', query);

            expect(validateEmailOrPhone).toHaveBeenCalledWith(query);
            expect(contactService.search).toHaveBeenCalledWith(query);
        });

        it('should log an error if the query for "search" is missing', () => {
            commandHandler('search', null);

            expect(console.log).toHaveBeenCalledWith("✗ Error:", expect.stringContaining('Missing email/phone number for search command'));
            expect(contactService.search).not.toHaveBeenCalled();
        });
    });


    describe('delete command', () => {
        it('should call contactService.delete with a validated email', () => {
            const email = 'john@example.com';
            validateEmail.mockReturnValue(email);

            commandHandler('delete', email);

            expect(validateEmail).toHaveBeenCalledWith(email);
            expect(contactService.delete).toHaveBeenCalledWith(email);
        });

        it('should log an error if the email for "delete" is missing', () => {
            commandHandler('delete', undefined);

            expect(console.log).toHaveBeenCalledWith("✗ Error:", expect.stringContaining('Missing email for delete command'));
            expect(contactService.delete).not.toHaveBeenCalled();
        });
    });


    it('should call contactService.list for the "list" command', () => {
        commandHandler('list');
        expect(contactService.list).toHaveBeenCalledTimes(1);
    });

    it('should call console.log with help text for the "help" command', () => {
        commandHandler('help');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js [command] [arguments]'));
    });

    it('should log an error for an unknown command', () => {
        const unknownCmd = 'fly';
        commandHandler(unknownCmd);
        expect(console.log).toHaveBeenCalledWith("✗ Error:", expect.stringContaining(`Unknown command ${unknownCmd}`));
    });

    it('should catch and log errors thrown by service/validation functions', () => {
        const errorMessage = 'Invalid name format!';
   
        validateName.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        commandHandler('add', ['Invalid-Name', 'email@test.com', '123']);

        expect(console.log).toHaveBeenCalledWith("✗ Error:", errorMessage);
        expect(contactService.add).not.toHaveBeenCalled();
    });
});