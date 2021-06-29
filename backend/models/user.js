const { UnauthorizedError } = require("../utils/errors")
const db = require("../db")
class User {
    static async login(credentials) {
        // user should submit their email and password
        // if any of these fields are missing, throw an error
        //
        // lookup the user in the db by email
        // with pass in db
        //if there is a match
        //
        // if any of this goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password")
    }

    static async register(credentials) {
        // user should submit their email and pass
        // if any of these fields are missing throw an error
        //take user pass and hash it 
        //take email and lowercase
        //create user in db and return user
    }
}

module.exports = User