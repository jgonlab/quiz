var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId',quizcontroller.load); //autoload :quizId
router.param('commentId',commentController.load); //autoload :commentId

//Definición de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

//Definición de rutas de /quizes
router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizId(\\d+)', quizcontroller.show);
router.get('/quizes/:quizId(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/author', quizcontroller.author);
router.get('/quizes/new', sessionController.loginRequired, quizcontroller.new);
router.post('/quizes/create', sessionController.loginRequired, quizcontroller.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizcontroller.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizcontroller.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizcontroller.destroy);

//Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
