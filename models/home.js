const { rejects } = require("assert")
const mongoose = require("mongoose")
const { resolve } = require("path")

var schema= mongoose.Schema({
title:String,
desc:String,
price:Number,
author:String,
image:String,
userId:String
})

var book=mongoose.model("allbook",schema)

exports.getthreebooks=()=>{

return new Promise((resolve,rejects)=>{
mongoose.connect("mongodb://localhost:27017/books").then(()=>{
return book.find({}).limit(3)

}).then(books=>{
mongoose.disconnect()
resolve(books)
}).catch(err=>rejects(err))

})
}

exports.getallbooks=()=>{

return new Promise((resolve,rejects)=>{
mongoose.connect("mongodb://localhost:27017/books").then(()=>{
return book.find({})

}).then(books=>{
mongoose.disconnect()
resolve(books)
}).catch(err=>rejects(err))



})

}

exports.getonebookD=(id)=>{

return new Promise((resolve,rejects)=>{
mongoose.connect("mongodb://localhost:27017/books").then(()=>{
return book.findById(id)

}).then(books=>{
mongoose.disconnect()
resolve(books)
}).catch(err=>{
    mongoose.disconnect()

    rejects(err)})



})

}

exports.postaddbookpage=(title,author,price,desc,image,userId)=>{
    return new Promise((resolve,reject)=>{
     console.log(desc)
    mongoose.connect("mongodb://localhost:27017/books").then(()=>{
    let newbook=new book({
        title:title,
        desc:desc,
        price:price,
        author:author,
        image:image,
        userId:userId
    })
    return newbook.save()
    }).then(()=>{
        mongoose.disconnect()
        resolve('added ! ')

    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })

})
}


exports.getmybooks=(id)=>{

    return new Promise((resolve,rejects)=>{
    mongoose.connect("mongodb://localhost:27017/books").then(()=>{
    return book.find({userId:id})
    
    }).then(books=>{
    mongoose.disconnect()
    resolve(books)
    }).catch(err=>rejects(err))
    
    
    
    })
    
    }

    exports.deletebook=(bookid)=>{

        return new Promise((resolve,reject)=>{
        mongoose.connect("mongodb://localhost:27017/books").then(()=>{
        return book.deleteOne({_id:bookid})
        }).then(books=>{
        mongoose.disconnect()
        resolve('Delteted !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
        
        
        
        })
        
        }  
    
        exports.getmybooksupdate=(id)=>{
            return new Promise((resolve,rejects)=>{
            mongoose.connect("mongodb://localhost:27017/books").then(()=>{
            return book.findById(id)
            }).then(books=>{
            mongoose.disconnect()
            resolve(books)
            }).catch(err=>rejects(err))
            
            
            
            })
            
            }

                exports.updatebook=(id,title,author,price,desc,image,userId)=>{
                    return new Promise((resolve,reject)=>{
                    mongoose.connect("mongodb://localhost:27017/books").then(()=>{
                        return book.updateOne({_id:id},{title:title,desc:desc,price:price,author:author,image:image,userId:userId})
                    }).then(()=>{
                        mongoose.disconnect()
                        resolve('updated ! ')
                
                    }).catch((err)=>{
                        mongoose.disconnect()
                        reject(err)
                    })
                
                })
                }