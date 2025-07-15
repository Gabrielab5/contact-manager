function validateName(name){
   if (/^[a-zA-Z]+$/.test(name)) return name
   else throw new Error("✗ Error: Name isn't valid. try again.")
}

function validateEmail(email){
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return email
  else throw new Error("✗ Error: Email address isn't valid. try again.")
}

function validatePhone(phone){
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone)) return phone
    else throw new Error("✗ Error: Phone number isn't valid. try again.")
}

function validateEmailOrPhone(input){
    validatedInput = validateEmail(input) || validatePhone(input)
    if (validatedInput) return validatedInput
    else throw new Error("✗ Error: Search contacts by name or email only. name or email arent valid")
}

export default {
    validateName,
    validateEmail,
    validatePhone,
    validateEmailOrPhone
}