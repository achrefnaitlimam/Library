const user= require("../models/register")


exports.registerpage=(req,res,next)=>{

res.render("register",{verifuser:req.session.userId,message:req.flash('error')[0]})
}


exports.postdata=(req,res,next)=>{

    user.registeruser(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect('/login')
    }).catch((err)=>{
    req.flash('error',err)
    res.redirect("/register")
    })

    }


    exports.loginpage=(req,res,next)=>{

        res.render("login",{verifuser:req.session.userId,message:req.flash('error')[0]})
        }

        exports.postdatalogin=(req,res,next)=>{

            user.loginUser(req.body.email,req.body.password).then((id)=>{
                req.session.userId=id
                res.redirect("/")
            }).catch((err)=>{
            req.flash('error',err)
             res.redirect("/login")
             })

            }

    exports.logoutfonction=(req,res,next)=>{
        req.session.destroy(()=>
        res.redirect('/login')
        )
      

    }