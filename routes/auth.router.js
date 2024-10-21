const express = require('express')
const router = express.Router()
const { requiresAuth } = require('express-openid-connect')
const axios = require('axios')

router.get('/', (req, res)=>{
    console.log(req.oidc.isAuthenticated())
    console.log(req.oidc.accessToken)
    res.render('index', {
        title:"Express", 
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    })
})

router.get('/secured', requiresAuth(), async (req, res)=>{
    let data = {}
    console.log(req.oidc)
    const {token_type, access_token} = req.oidc.accessToken
    try{
        const response = await axios.get('http://localhost:3001/test/private',
            {
                headers: {
                    Authorization: `${token_type} ${access_token}`
                }
            }
        )
        data = response.data
    }catch(error){
        console.log(error)
    }
    console.log(req.oidc.isAuthenticated())
    res.render('secured', {
        title:"Secure Page", 
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        data: data
    })
})

module.exports = router;