const db = require("../db")
const { BadRequestError, NotFoundError} = require("..utils/errors")

class Nutrition {
    static async createNutritionActivity({ newActivity, user}) {
        const requiredFields = ["foodName", "calories", "category", "servingSize"]
        requiredFields.forEach((field) => {
            if (!newActivity?.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing required field - ${field} - in request body.`)
            }
        })

        const results = await db.query(
            `
            INSERT INTO nutrition (user_id, food_name, calories, category, serving_size)
            VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5)
            RETURNING id,
                user_id AS "userID",
                $1 AS "username",
                food_name AS "foodName",
                calories,
                category,
                serving_size AS "servingSize", 
                created_at AS "createdAt",
                updated_at AS "updatedAt";
            `,
            [
                user.username,
                newActivity.foodName,
                newActivity.calories,
                newActivity.category,
                newActivity.servingSize,
            ]

        )

        return results.rows[0]
    }

    static async fetchActivityById(activityId) {
        const results = await db.query(
            `
            SELECT id,
                   user_id AS userID,
                   (
                       SELECT username
                       FROM users
                       WHERE id = user_id
                   ) AS "username",
                   food_name AS "foodName",
                   calories,
                   category,
                   serving_size AS "servingSize"
                FROM nutrition
                WHERE id = $1;
            `,
            [activityId]
        )

        const activity = results.row[0]

        if (activity?.foodName) return activity
        
        throw new NotFoundError("No activity found with that id.") 
    }

    static async fetchAll() {
        const results = await db.query(
            `
            SELECT nutrition.id,
                   nutrition.user_id AS "userID",
                   users.username AS "username",
                   nutrition.food_name AS "foodName",
                   nutrition.calories,
                   nutrition.category,
                   nutrition.serving_size AS "servingSize",
                   nutrition.created_at AS "createdAt",
                   nutrition.updated_at AS "updatedAt"
                FROM nutrition
                JOIN users ON users.id = nutrition.user_id; 
            `
        )

        return results.row
    }   

} 

module.exports = Nutrition 