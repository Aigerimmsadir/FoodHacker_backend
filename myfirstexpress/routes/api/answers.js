const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Answers = mongoose.model('Answers');
const Users = mongoose.model('Users');
//POST new user route (optional, everyone has access)


router.get('/', auth.optional, (req, res, next) => {
 Answers.find({} ,(err, answers) => {

        
        if (err)
            return res.json({status: 'error', data: err});
        
        return res.json({status: 'ok', data: answers});
    })
});

router.get('/y', function(req, res) {
    // if the request has the user object, go to the user page
    console.log(req.user);
    return res.json({status: 'ok'});
});
router.post('/', auth.required, (req, res, next) => {
  const { body: { answer } } = req;

    const { payload: { id } } = req;
  const finalAnswer = new Answers(answer);
	Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      finalAnswer.author = user._id;
    })

  return finalAnswer.save()
    .then(() => res.json({Answer:finalAnswer.toJSON()}))
});



module.exports = router;