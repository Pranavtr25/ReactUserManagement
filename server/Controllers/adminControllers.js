import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

export default {
    adminLogin : async (req, res) => {
        const admin = process.env.ADMIN_USER
        const adminPass = process.env.ADMIN_PASSWORD
        try {
            console.log(admin)
            console.log(adminPass)
            console.group(req.body)
            if(admin !== req.body?.email){
                return res.status(401).send({success : false, message : 'Email is incorrect'})
            }
            if(adminPass !== req.body?.password){
                return res.status(401).send({success : false, message : 'Password is incorrect'})
            }
            const token = jwt.sign({email : req.body?.email},process.env.JWT_SECRET,{
                expiresIn : '1h'
            })
            console.log(token)
            return res.status(200).send({success:true, token, message : 'admin logged in successfully'})
        } catch (error) {
            console.log(`error admin login \n ${error}`)
        }
    },

    fetchUsersData : async (req, res) => {
        try {
            console.log(`req reached fetchUserData controller`)

            const query = `SELECT id,username,email,phone FROM users`

            const userDetails = await pool.query(query) || []

            console.log(userDetails)

            res.status(200).send({success:true, userDetails : userDetails?.rows})
        } catch (error) {
            console.log(`error user data fetching : \n ${error}`)
        }
    },

    editUserData : async (req, res) => {
        try {
            console.log('-==-')
            console.log(req.body)
            const {username, phone, email, oldEmail} = req.body
            console.log(username, phone, email, oldEmail)
                        
            const query = `UPDATE users SET username= $1 , email = $2, phone = $3 WHERE email = $4`
            const result = await pool.query(query,[username, email, phone, oldEmail])
            console.log(result)
            res.status(200).send({success:true,message:'user updated'})

        } catch (error) {
            console.log(`error editing user data \n ${error}`)
        }
    },

    deleteUser : async (req, res) => {
        try {
            console.log(req.body)
            const id = req.body?.id
            const query = `DELETE FROM users WHERE id=$1`
            const data = await pool.query(query,[id])
            console.log(data)
            res.status(200).send({success:true})
        } catch (error) {
            console.log(`error deleting user \n ${error}`)
        }
    }
}