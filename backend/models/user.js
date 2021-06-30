const { UnauthorizedError, BadRequestError } = require("../utils/errors")
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
        const requiredFields = ["email", "username", "firstName", "lastName", "password", "isAdmin"]
        requiredFields.forEach((property) => {
            if (!credentials?.hasOwnProperty(property)) {
              throw new BadRequestError(`Missing ${property} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
        
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
          throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
        }

        const existingUserWithUsername = await User.fetchUserByUsername(credentials.username)
        if (existingUserWithUsername) {
          throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
        }

        const normalizedEmail = credentials.email.toLowerCase()
        const normalizedUsername = credentials.username.toLowerCase()


        const userResult = await db.query(
            `INSERT INTO users (email, username, first_name, last_name, password, is_admin)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, email, username, first_name, last_name, is_admin, created_at;
            `,
            [
              normalizedEmail,
              normalizedUsername,
              credentials.firstName,
              credentials.lastName,
              credentials.password,
              credentials.isAdmin
              
            ]
        )
        const user = userResult.rows[0]
        return user

    }

    static async fetchUserByEmail(email) {
        if (!email) {
          throw new BadRequestError("No email provided")
        }
    
        const query = `SELECT * FROM users WHERE email = $1`
    
        const result = await db.query(query, [email.toLowerCase()])
    
        const user = result.rows[0]
    
        return user
    }

    static async fetchUserByUsername(username) {
        if (!username) {
          throw new BadRequestError("No username provided")
        }
    
        const query = `SELECT * FROM users WHERE username = $1`
    
        const result = await db.query(query, [username])
    
        const user = result.rows[0]
    
        return user
    }
    

}

module.exports = User