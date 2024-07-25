// const bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'
// const pool = require('../config/db')
import pool from '../config/db.js'
import jwt from 'jsonwebtoken'
// const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

export default {
    signUp : async (req, res) => {
        try {
            const {userName, email, phoneNumber, password} = req?.body
            console.log(req.body)
            const checkEmailQuery = 'SELECT email FROM users WHERE email = $1'
            const checkEmail = await pool.query(checkEmailQuery, [email])
    
            if(checkEmail?.rows?.length > 0){
                return res.status(401).send({success : false, message : 'email already exists'})
            }
    
            const hashedPassword = await bcrypt.hash(password, 10)
            const query = 'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *'
            const newUser = await pool.query( query,[userName, email, phoneNumber, hashedPassword] )
            const newUserData = newUser.rows[0]
            console.log("---------------")
            console.log({id : newUserData?.id, email : newUserData?.email})
            console.log("---------------")
            const token = jwt.sign({id : newUserData?.id, email : newUserData?.email},process.env.JWT_SECRET,{
                expiresIn : '1h'
            })
            console.log(token)
            res.status(200).send({success : true, token, message : 'registered successfully'})
        } catch (error) {
            res.status(400)
            console.log(`error signup : \n ${error}`)
        }
    },

    login : async (req,res) => { 
        try{
            const {email, password} = req.body
            console.log(email, password)
            const emailExistQuery = 'SELECT * FROM users WHERE email = $1'
            const emailExist = await pool.query(emailExistQuery,[email])
            console.log(emailExist)
            const fetchedPassword = emailExist?.rows[0]?.password
            const userData = emailExist.rows[0]
            if(!emailExist?.rows.length){
                return res.status(401).send({success : false, message : "email doesn't exist"})
            }
            console.log(`fetchedPassword: ${fetchedPassword}`)
            const isMatch = await bcrypt.compare(password, fetchedPassword)
            if(isMatch){
                const token = jwt.sign({id : userData?.id, email : userData?.email},process.env.JWT_SECRET,{
                    expiresIn : '1h'
                })
                console.log(token)
                return res.status(200).send({success:true, token, message : 'logged in successfully'})
            }else{
                return res.status(401).send({success : false, message : 'incorrect password'})
            }
        } catch (error){
            console.log(`error login : \n ${error}`)
        }
    },

    uploadImage : async (req,res) => {
        try {
            console.log("hoi hoi")
            console.log(req)
            const {filename} = req.file;
            const token = req.body?.userJWT
            console.log("----------------")
            console.log(filename)
            console.log("----------------")
            // console.log(JSON.parse(token))
            // console.log(JWT_SECRET)
            const {email} = jwt.verify(JSON.parse(token), String(JWT_SECRET))
            // console.log(userData)
            const query = 'UPDATE users SET img_url = $1 where email = $2'
            const response = await pool.query(query, [filename, email])
            res.status(200).send({success: true, filename, message : `Image uploaded successfully`})
        } catch (error) {
            res.status(401).send({success : false, message : 'Internal server error'})
            console.log(`error uploading image \n ${error}`)
        }
    },

    fetchUserData : async (req, res) => {
        try {
            const token = req.body.JWT
            const {email} = jwt.verify(JSON.parse(token), String(JWT_SECRET))
            const query = 'SELECT * FROM users WHERE email = $1'
            const queryResponse = await pool.query(query, [email])
            console.log(queryResponse)
            const userData = queryResponse.rows[0]
            res.status(200).send({success : true, userData, message : 'userdata fetched successfully'})
        } catch (error) {
            res.status(401).send({success : false, message : 'internal server error'})
            console.log(`error fetching the userdata \n ${error}`)
        }
    }

}


