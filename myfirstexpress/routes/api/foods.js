const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Foods = mongoose.model('Foods');

//POST new user route (optional, everyone has access)


router.get('/', auth.optional, (req, res, next) => {
 Foods.find({}, { _id: 0 },{sort: {name: 1}} ,(err, foods) => {
        
        if (err)
            return res.json({status: 'error', data: err});
        
        return res.json({status: 'ok', data: foods});
    })
});


router.post('/', auth.required, (req, res, next) => {
  const { body: { food } } = req;

  if(!food.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  

  const finalFood = new Foods(food);


  return finalFood.save()
    .then(() => res.json({ food: finalFood.toJSON() }));
});
// router.post('/', auth.optional, (req, res, next) => {
//   const { body: { user } } = req;

//   if(!user.email) {
//     return res.status(422).json({
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }

//   const finalUser = new Users(user);

//   finalUser.setPassword(user.password);

//   return finalUser.save()
//     .then(() => res.json({ user: finalUser.toAuthJSON() }));
// });

// //POST login route (optional, everyone has access)
// router.post('/login', auth.optional, (req, res, next) => {
//   const { body: { user } } = req;

//   if(!user.email) {
//     return res.status(422).json({
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }

//   return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//     if(err) {
//       return next(err);
//     }

//     if(passportUser) {
//       const user = passportUser;
//       user.token = passportUser.generateJWT();

//       return res.json({ user: user.toAuthJSON() });
//     }

//     return status(400).info;
//   })(req, res, next);
// });

// //GET current route (required, only authenticated users have access)
// router.get('/current', auth.required, (req, res, next) => {
//   const { payload: { id } } = req;

//   return Users.findById(id)
//     .then((user) => {
//       if(!user) {
//         return res.sendStatus(400);
//       }

//       return res.json({ user: user.toAuthJSON() });
//     });
// });




module.exports = router;