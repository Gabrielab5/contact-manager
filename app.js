import {commandHandler} from './commands/commandHandler.js'

const userArgs = process.argv.slice(2);

commandHandler(userArgs[0], userArgs.slice(1))