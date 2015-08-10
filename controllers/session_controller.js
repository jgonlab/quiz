//MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }
};

//GET /login --> Formulario de login
exports.new = function(req,res){
    var errors = req.session.errors || {};
    req.session.errors = {};
    res.render('sessions/new', {errors: errors});
};

//POST /login  --> Crear la sesión
exports.create = function(req,res) {
    var login = req.body.login;
    var password = req.body.password;
    
    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error,user) {
        if (error){ //Si hay error retornamos mensajes de error de sesión
            console.log("Ha ocurrido un error: " + error);
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }
        
        req.session.user = {id:user.id, username:user.username};
        res.redirect(req.session.redir);
    });
};

//DELETE /logout  --> Destruir sesión
exports.destroy = function(req,res){
    delete req.session.user;
    //res.redirect(req.session.redir.toString()); //redirest a path anterior a login
    res.redirect(req.session.redir); //redirest a path anterior a login
}