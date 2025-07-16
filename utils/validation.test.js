
const { validateName, validateEmail, validatePhone, validateEmailOrName } = require('./validation')

describe('Validation Utilities', () => {
    describe('validateName', () => {
        it('should return the name if it contains only letters', () => {
            const validName = 'Gabriel'
            expect(validateName(validName)).toBe(validName)
        })

        it('should throw an error if the name contains numbers or symbols', () => {
            const invalidName = 'Gabriel123'
            expect(() => validateName(invalidName)).toThrow("✗ Error: Name isn't valid. try again.")
        })
    })

    describe('validateEmail', () => {
        it('should return the name if it has a valid format' , () => {
            const validEmail = 'test@test.com'
            expect(validateEmail(validEmail)).toBe(validEmail)

        })

        it('should throw an error for invalid email', () => {
            const invalidEmail = 'testom'
            expect(() => validateEmail(invalidEmail)).toThrow("✗ Error: Email address isn't valid. try again.")
        })
    })

    describe('validatePhone', () => {
        it('should return the phone number if it matches the xxx-xxx-xxxx format', () => {
            const validPhone = '555-123-4567'
            expect(validatePhone(validPhone)).toBe(validPhone)
        })

        it('should throw an error for an invalid phone number format', () => {
            const invalidPhone = '5551234567'
            expect(() => validatePhone(invalidPhone)).toThrow("✗ Error: Phone number isn't valid. try again.")
        })
    })

    describe('validateEmailOrName', () => {
        it('should return the input if it is a valid name', () => {
            const validName = 'Shila'
            expect(validateEmailOrName(validName)).toBe(validName)
        })

        it('should return the input if it is a valid email', () => {
            const validEmail = 'shila@love.com';
            expect(validateEmailOrName(validEmail)).toBe(validEmail);
        })

        it('should throw an error if the input is neither a valid name nor a valid email', () => {
            const invalidInput = '123-invalid'
            expect(() => validateEmailOrName(invalidInput)).toThrow("✗ Error: Search contacts by name or email only. name or email aren't valid")
        })
    })

})