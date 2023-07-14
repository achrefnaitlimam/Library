const allbooks= require("../models/home")



exports.threebooks=(req,res,next)=>{

    allbooks.getthreebooks().then(books=>{
        res.render('index',{books:books,
        verifuser:req.session.userId})

    })

}

