//!import library router
const router = require('express').Router()

//!get "/" route
router.get('/',(req,res)=>{
    res.render('user/index',{
        viewTitle:"Selamat Datang !",
        viewBrand:"Ngeluh dengan Bebas,tanpa batas."
    })
})

//!export router
module.exports = router