//!import model 
Post = require('../models/Post')

//!exporting route get "/home","/home/posts","/home/posts/:id"
exports.index = (req,res,next)=>{
    session_store = req.session;
    Post.find({})
    .sort('date_created')
    .lean()
    .then(data=>{
        res.render("post/home",{
            list:data,
            viewTitle:"Daftar Posts",
            session_store:session_store 
        })
    }).catch(err=> console.log(err))
}
exports.indexPosts = (req,res,next)=>{
    res.render('post/addOrEdit',{
        viewTitle:"Tambah Posts",
        viewBrand:"(Sekali lagi, bebas.)" 
    })
}
exports.viewPosts = (req,res,next)=>{
    Post.findById(req.params.id)
    .lean()
    .then(data=>{
        res.render("post/addOrEdit",{
            viewTitle: "Mengubah Posts",
            post:data
        })
    }).catch(err =>console.log(err))
}

//!exporting route post "home/posts","home/posts/delete/:id"
exports.newOrEdit=(req,res,next)=>{
    if(req.body._id == ""){ //? <== if dont have value _id 
        addPost(req,res) //? <== separated by function
    }else{
        editPost(req,res) //? <== separated by function
    }
}
exports.deletePosts=(req,res,next)=>{
    Post.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) (res.redirect('/home'))
        else {console.log(`Error in posts delete : ${err}`)}
    })
}

//!separated function add and edit post
async function addPost(req,res,err){
    const post = new Post({
        author : req.body.author,
        title : req.body.title,
        posts : req.body.posts
    })
    try{
        const savedPost = await post.save()
        res.redirect('/home')
    }catch{
        console.log(err)
    }

} 

function editPost(req,res){
    Post.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,post)=>{
        if (err) res.send(err)
        res.redirect('/home')
        
    }) 
}
