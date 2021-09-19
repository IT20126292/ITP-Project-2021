const router = require("express").Router();
let admin = require("../Models/admin.js");
const jwt = require("jsonwebtoken");
const auth = require("../frontend/src/Components/auth");

//CREATE FUNCTION 1
router.route("/add").post((req,res)=>{
     const adminID = req.body.adminID;
     const username = req.body.username;
     const email = req.body.email;
     const Password = req.body.Password;

     const newAdmin = new admin({
        adminID,
        username,
        email,
        Password
     })

     newAdmin.save().then(()=>{
         res.json("New Admin Added to the database");
     }).catch((err)=>{
         console.log(err);
     })

})

//CREATE FUNCTION 2
router.post('/post/save',(req,res)=>{
    let newAdmin = new admin(req.body);

    newAdmin.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts Saved Successfully"
        });
    });
});

//CREATE FUNCTION 3
router.post("/newAdd", async (req, res) => {
    try {
      const {adminID,username,email,Password,Password1} = req.body;

      let pos = await admin.findOne({ email })

        if (pos) {
            throw new Error("User already exists");
        }
        pos = {
            adminID:adminID,
            username:username,
            email:email,
            Password:Password,
            Password1:Password1
        };

      const newAdmin = new admin(pos);
      await newAdmin.save();
      const token = await newAdmin.generateAuthToken();
      res
        .status(201)
        .send({ status:"posts Created", admin: newAdmin, token: token });

    }catch (error) {

      console.log(error.message);

      res.status(500).send({error: error.message});

    }
});

//RETRIEV FUNCTION 1
router.route("/").get((req,res)=>{
    admin.find().then((admin)=>{
        res.json(admin)
    }).catch((err)=>{
        console.log(err)
    })
})

//RETRIEV FUNCTION 2
router.get('/posts',(req,res)=>{
    admin.find().exec((err,admin)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAdmins:admin
        });
    });
});

//UPDATE FUNCTION 1
router.route("/update/:id").put(async(req,res)=>{
    let adminId = req.params.id;
    const {adminID,username,email,Password} = req.body;
    const updateAdmin = {
        adminID,
        username,
        email,
        Password
    }
    const update = await admin.findByIdAndUpdate(adminId, updateAdmin).then(()=>{
        res.status(200).send({status:"Admin Updated", update: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error Generated in the Admin updated part", error: err.message});
    })

    
})

//UPDATE FUNCTION 2
router.put('/post/update/:id',(req,res)=>{
    admin.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,update)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated Successfully",update
            });
        }
    );
});

//DELETE FUNCTION 1
router.route("/delete/:id").delete(async(req,res)=>{
    let adminId = req.params.id;
    await admin.findByIdAndDelete(adminId).then(()=>{
        res.status(200).send({status:"admin deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete admin", error: err.message});
    })
})

//DELETE FUNCTION 2
router.delete('/post/delete/:id',(req,res)=>{
    admin.findByIdAndDelete(req.params.id).exec((err,deleteAdmin)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }
        return res.json({
            message:"Delete Successfull", deleteAdmin
        });
    });
});

//SEARCH FUNCTION 1
router.route("/get/:id").get(async(req,res)=>{
    let adminId = req.params.id;
    const Admin = await admin.findById(adminId).then((Admin)=>{
        res.status(200).send({status:"Admin fetched", Admin: Admin});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with search admin", error: err.message});
    })
})

//SEARCH FUNCTION 2
router.get('/posts/:id',(req,res)=>{
    let getid = req.params.id;

    admin.findById(getid,(err,search)=>{
        if(err){
            return res.status(400).json({
                success:false,err
            });
        }
        return res.status(200).json({
            success:true,
            search
        })
    });
});

//LOGIN FUNCTION
router.post('/post/login', async (req, res) => {
    try {
      const {email, Password} = req.body
      const pos = await admin.findByCredentials(email, Password)
      const token = await pos.generateAuthToken()
      res.status(200).send({token: token, pos: pos});
    } catch (error) {
      res.status(500).send({ error: error.message });
      console.log(error);
    }
});

module.exports = router;

