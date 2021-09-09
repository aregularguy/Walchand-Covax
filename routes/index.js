const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//@desc  Login/Lading Page
//@route GET/
// app.use(express.static('views/images'))

router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})
//@desc  Login/Lading Page
//@route GET/

router.get('/dashboard', ensureAuth,(req,res) => {
    
    res.render('dashBoard',{
        name:req.user.firstName,
        lasstname:req.user.lastName,
        pic:req.user.image
    })
})




module.exports=router