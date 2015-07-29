var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId',quizcontroller.load); //autoload :quizId

router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizId(\\d+)', quizcontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/author', quizcontroller.author);
router.get('/quizes/new', quizcontroller.new);
router.post('/quizes/create', quizcontroller.create);
router.get('/quizes/:quizId(\\d+)/edit', quizcontroller.edit);
router.put('/quizes/:quizId(\\d+)', quizcontroller.update);

module.exports = router;
