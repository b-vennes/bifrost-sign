const arg = require("arg")
const brambljs = require("brambljs")
const base58 = require("base-58")

const args = arg({
    '-s': String,
    '-m': String,
    '-k': String
});
 
if (!args["-s"] || !args["-m"] || !args["-k"]) {
    console.log('Secret value, message, and key file required.')
    return
}

const secret = args["-s"]
const message = args["-m"]
const keyFilePath = args["-k"]

const keyMan = brambljs.KeyManager({
    password: secret,
    networkPrefix: 'private',
    keyPath: keyFilePath
})

const pk = base58.encode([1, ...base58.decode(keyMan.pk)])

const signedMessage = base58.encode([1, ...keyMan.sign(message)])

const result = `{ "${pk}": "${signedMessage}" }`

console.log(result)
