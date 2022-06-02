const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

// @desc Register a new user
// @route POST /api/user/register
const register = async (req, res) => {
  try {
    
    const { username, password, roleId } = req.body
    
    const oldUser = await prisma.users.findUnique(
      { where: { username } }
    )
  
    if (oldUser) {
      return res.status(409).send("User telah terdaftar. Silahkan login!");
    }
    
    // encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10)
  
    const user = await prisma.users.create({
      data: {
        role_id: roleId,
        username,
        password: encryptedPassword,
      }
    })
  
    const token = jwt.sign(
      { user_id: user.id, username, roleId: user.role_id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )
  
    user.token = token
  
    // return new user
    res.status(201).json(user)
  } catch (error) {
    console.log("error", error)
  }
}

// @desc Login
// @route POST /api/user/login
const login = async (req, res) => {
  try {
    
    const { username, password } = req.body
    
    const user = await prisma.users.findUnique({ where: { username } } )

    if (user && (await bcrypt.compare(password, user.password))) {
      // generate token

      const token = jwt.sign(
        {user_id: user.id, username, roleId: user.role_id},
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      )
      
      // save user token
      user.token = token

      // user
      res.status(200).json(user)
    } else {
      res.send(401).json({message: 'Username atau password yang anda masukkan salah'})
    }
  
    
  } catch (error) {
    console.log("error", error)
  }
}

module.exports = {
  register,
  login
}