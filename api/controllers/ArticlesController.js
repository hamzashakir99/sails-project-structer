/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const validator = require('validator');

module.exports = {
  allusers: async(req, res)=>{
    try {
      const getAllUsers = await Articles.find();
      res.status(200).json(getAllUsers);
    } catch (error) {
      console.log(error);
      res.send('Some Error');
    }
  },
  saveusers: async(req, res)=>{
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if(email && password){
        if(validator.isEmail(email)){
          const CheckEmail = await Articles.findOne({email});
          if(CheckEmail){
            res.send('Email Already Done');
          }
          else{
            Articles.create({
              email,
              password
            }).then((r)=>{
              console.log(`User Save => ${r}`);
            }).catch((err)=>console.log(`There is Error => ${err}`));
            res.send('Your Data is Saved');
          }
        }
      }
      else{
        res.send('Some Missing Data');
      }
    } catch (error) {
      console.log(error);
      res.send('Some Error');
    }
  },
  singleuser: async(req, res)=>{
    try {
      const { email } = req.query;
      let CheckEmail = await Articles.findOne({
        email
      });
      if(!CheckEmail){
        CheckEmail = {
          ...CheckEmail,
          message: 'Email Not Exit'
        }
      }
      res.status(200).json(CheckEmail);
    } catch (error) {
      console.log(error);
      res.send('Some Error');
    }
  }
};

