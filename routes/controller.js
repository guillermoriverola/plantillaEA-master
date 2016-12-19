var Estudiant = require('./model/estudiant');
var Assignatura = require('./model/assignatura');

// Obtiene todos los objetos estudiantes de la base de datos
exports.getEstudiants = function (req, res){
    Estudiant.find(
        function(err, estudiant) {
            if (err)
                res.send(err);
            res.json(estudiant);
        }
    );
};

exports.getEstudiantsOrdenats = function (req, res){
    Estudiant.find({ $query: {}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, estudiant) {
            if (err)
                res.send(err);
            res.json(estudiant);
        }
    );
};

exports.getAssignatures = function (req, res){
    Assignatura.find({ $query: {}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, assignatura) {
            if (err)
                res.send(err);
            res.json(assignatura);
        }
    );
};

//Modificar estudiante
exports.modificarEstudiant = function (req, res){
    console.log(req.params.estudiant_id);
    Estudiant.update(
        {_id: req.params.estudiant_id},
        {nom : req.body.nom, direccio: req.body.direccio, telefons: {casa: req.body.telefons.casa, feina: req.body.telefons.feina}},
        function(err, estudiant) {
            if (err)
                res.send(err);
            // Obtiene y devuelve todos los estudiants tras crear uno
            Estudiant.find(function (err, estudiant) {
                if (err)
                    res.send(err);
                res.json(estudiant);
            });
        }
    )
}

// Guarda un objeto Estudiant en base de datos
exports.setEstudiant = function(req, res) {

    // Creo el objeto phones: [req.body.phones.home, req.body.phones.work]
    Estudiant.create(
        {nom : req.body.nom, direccio: req.body.direccio, telefons: {casa: req.body.telefons.casa, feina: req.body.telefons.feina}},
        function(err, estudiant) {
            if (err)
                res.send(err);
            // Obtiene y devuelve todos los estudiants tras crear uno
            Estudiant.find(function(err, estudiant) {
                if (err)
                    res.send(err);
                res.json(estudiant);
            });
        });

};

/////////////////////////////////////////////////////////////////
// Obtiene todos los objetos subject de la base de datos
exports.getAssignatures = function (req, res){
    Assignatura.find({ $query: {}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, assignatura) {
            if (err)
                res.send(err);
            res.json(assignatura);
        }
    );
};



// Obtiene detalles de una asignatura
exports.getAssignatura = function(req, res){
    Assignatura.findOne( {_id : req.params.assignatura_id},
        function(err, assignatura) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (assignatura == null){
                console.log("La assignatura no existeix!");
                res.json(assignatura);
            }
            else {
                console.log("Existeix la assignatura")
                res.json(assignatura);
            }
        });
};

// Obtiene detalles de una asignatura
exports.getAssignatura2 = function(req, res){
    Assignatura.findOne( {nom : req.params.nom},
        function(err, assignatura) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (assignatura == null){
                console.log("La assignatura no existeix!");
                res.json(assignatura);
            }
            else {
                console.log("Existeix la assignatura")
                res.json(assignatura);
            }
        });
};

// Obtiene detalles de una asignatura
exports.getAssignaturanom = function(req, res){
    Assignatura.findOne( {_id : req.params.assignatura_id},
        function(err, assignatura) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (assignatura == null){
                console.log("La assignatura no existeix!");
                res.json(assignatura);
            }
            else {
                console.log("Existeix la assignatura")
                res.json(assignatura);
            }
        });
};

// Obtiene detalles de una asignatura
exports.getAssignaturesperiode = function(req, res){
    Assignatura.findOne( {_id : req.params.assignatura_id},
        function(err, assignatura) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (assignatura == null){
                console.log("La assignatura no existeix!");
                res.json(assignatura);
            }
            else {
                console.log("Existeix la assignatura")
                res.json(assignatura);
            }
        });
};



exports.getFilterPeriode = function (req, res){
    Assignatura.find({  $query: {when: req.params.when}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, assignatura) {

            if (err)
                res.send(err);
            res.json(assignatura);
        }
    );
};


exports.getFilterName = function (req, res){
    Assignatura.find({  $query: {nom: req.params.nom}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, assignatura) {

            if (err)
                res.send(err);
            res.json(assignatura);
        }
    );
};

exports.getEstudiantName = function (req, res){
    Estudiant.find({  $query: {nom: req.params.nom}, $orderby: { nom : 1, quantityest:-1 } },
        function(err, estudiant) {

            if (err)
                res.send(err);
            res.json(estudiant);
        }
    );
};

// Guarda un objeto subject en base de datos
exports.setAssignatura = function(req, res) {
    Assignatura.create(
        {nom : req.body.nom, when: req.body.when},
        function(err, assignatura) {
            if (err)
                res.send(err);
            // Obtiene y devuelve todos los subjects tras crear una
            Assignatura.find({ $query: {}, $orderby: { nom : 1, quantityest:-1 } },
                function(err, assignatura) {
                    if (err)
                        res.send(err);
                    res.json(assignatura);
            });
        });
};

// Añadimos estudiante a asignatura
exports.addEstudiant = function(req, res){
    //Verificamos que el usuario existe
    Estudiant.findOne( {nom : req.body.estudiant},
        function(err, estudiant) {
            if (err) {
                res.send(err);
                Console.log(err);
                res.json(estudiant);
            }
            else if (estudiant == null){
                console.log("El usuari no existeix!");
                res.json(estudiant);
            }
            else {
                console.log("Existeix el usuario");
                console.log("Usuari:", estudiant.nom, "ID:", estudiant._id);
                //Añadimos usuario a la asignatura
                Assignatura.update( {_id : req.params.assignatura_id},
                    {$push: {estudiants : estudiant._id}},
                    function(err, assignatura) {
                        if (err)
                            res.send(err);
                        //Devuelve la asignatura actualizada
                        Assignatura.find({_id : req.params.assignatura_id},
                            function(err, assignatura) {
                            if (err)
                                res.send(err);
                                console.log("Afegit", assignatura);
                                res.json(assignatura);
                        });
                    });
            }
        });
};


//Obtener detalle estudiante
exports.getEstudiant = function(req, res) {
    Estudiant.findOne( {_id : req.params.estudiant_id},
        function(err, estudiant) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (estudiant == null){
                console.log("El usuari no existeix!");
                res.json(estudiant);
            }
            else {
                console.log("Existeix el usuario")
                res.json(estudiant);
            }
        });
};


exports.getEstudiantNom = function(req, res) {
    Estudiant.findOne( {nom : req.params.nom},
        function(err, estudiant) {
            if (err) {
                res.send(err);
                Console.log(err);
            }
            else if (estudiant == null){
                console.log("El usuari no existeix!");
                res.json(estudiant);
            }
            else {
                console.log("Existeix el usuario")
                res.json(estudiant);
            }
        });
};


//Event.findOneAndUpdate({"_id": req.params._id}, {$addToSet: {attendees: req.body.attendees}}, req.body, function (err, event) {
//    console.log(event._id);

// Eliminar asignatura
exports.deleteAssignatura = function(req, res) {
    Assignatura.remove({_id : req.params.assignatura_id}, function(err, assignatura) {
        if (err)
            res.send(err);
        Assignatura.find(function(err, assignatura) {
            if (err)
                res.send(err);
            res.json(assignatura);
        });
    });
};

// Eliminar estudiante
exports.deleteEstudiant = function(req, res) {
    Estudiant.remove({_id : req.params.estudiant_id}, function(err, estudiant) {
        if (err)
            res.send(err);
        Estudiant.find(function(err, estudiant) {
            if (err)
                res.send(err);
            res.json(estudiant);
        });
    });
};