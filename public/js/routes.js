// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })
        .when('/estudiants', {
            templateUrl : 'views/estudiants.html',
            controller  : 'estudiantsController'
        })
        .when('/assignatures', {
            templateUrl : 'views/assignatures.html',
            controller  : 'assignaturaController'
        })
        .when('/filtres', {
            templateUrl : 'views/filtres.html',
            controller  : 'assignaturaController'
        })
        .when('/estudiants/:id', {
            templateUrl : 'views/modificarestudiant.html',
            controller  : 'estudiantsController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message =  'Mínim MEAN - EA - Guillermo Riverola';
});

angularRoutingApp.controller('estudiantsController', function($scope, $http, $routeParams) {
    $scope.message = 'Formulari per afegir estudiants';
    $scope.newEstudiant = {};
    $scope.estudiants = {};
    $scope.selected = false;

    // Obtenemos todos los estudiantes
    $http.get('/api/estudiant').success(function(data) {
        $scope.estudiants = data;
    })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    // Función para registrar estudiante
    $scope.registrarPersona = function() {
        $http.post('/api/estudiant', $scope.newEstudiant)
            .success(function(data) {
                $scope.newEstudiant = {}; // Borramos los datos del formulario
                $scope.estudiants = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para eliminar estudiante
    $scope.deleteEstudiant = function(id) {
        $http.delete('/api/estudiant/' + id)
            .success(function(data) {
                $scope.newEstudiant = {};
                $scope.estudiants = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Función para obtener un estudiante y luego modificarlo con la siguiente funcion
    $scope.getPersona = function() {
        $http.get('/api/estudiant/' + $routeParams.id)
            .success(function(data) {
                $scope.modEstudiant = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de una persona
    $scope.modificarPersona = function(newPersona) {
        $http.put('/api/estudiant/' + $routeParams.id, $scope.modEstudiant)
            .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.persones = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});

angularRoutingApp.controller('assignaturaController', function($scope, $http) {
    $scope.message = 'Clicar sobre el nom de una assignatura i/o alumne per veure els detalls';
    $scope.newAssignatura = {};
    $scope.newAssignaturas = {};
    $scope.selAssignatura = {};
    $scope.selectedAssignatura = {};
    $scope.selectedEstudiant = {};
    $scope.assignatures = {};
    $scope.estudiants = {};
    $scope.selected = false;
    $scope.table1 = false;
    $scope.table2 = false;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/assignatura').success(function(data) {
        $scope.assignatures = data;
        console.log($scope.assignatures);
    })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Obtenemos todos los datos de la base de datos
    $scope.getAssignaturanom = function() {
        console.log($scope.newAssignaturas)
        $http.post('/api/assignaturaName/' + $scope.newAssignaturas.nom)
            .success(function(data) {
                $scope.newAssignaturas = {}; // Borramos los datos del formulario
                $scope.assignatures = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Obtenemos todos los datos de la base de datos
    $scope.getAssignaturesperiode = function() {
        $http.post('/api/assignaturaWhen/' + $scope.newAssignaturas.when)
            .success(function(data) {
                $scope.newAssignaturas = {}; // Borramos los datos del formulario
                $scope.assignatures = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // Función para añadir asignatura
    $scope.addAssignatura = function() {
        $http.post('/api/assignatura', $scope.newAssignatura)
            .success(function(data) {
                $scope.newAssignatura = {}; // Borramos los datos del formulario
                $scope.assignatures = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para eliminar asignatura
    $scope.deleteAssignatura = function(id) {
        $http.delete('/api/assignatura/' + id)
            .success(function(data) {
                $scope.newAssignatura = {};
                $scope.assignatures = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para añadir alumno a asignatura
    $scope.addEstudiant = function() {
        console.log($scope.selectedAssignatura._id);
        console.log($scope.newEstudiant);
        $http.post('/api/assignatura/' + $scope.selectedAssignatura._id, $scope.newEstudiant)
            .success(function(data) {
                $scope.selectedAssignatura = data;
                location.reload();

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para coger el Assignatura seleccionado en la tabla
    $scope.selectAssignatura = function(assignatura) {
        $scope.estudiantsList = {};
        $scope.table1 = true;
        $scope.selectedAssignatura = assignatura;
        $scope.selected = true;
        console.log($scope.selectedAssignatura);
        var listestudiants = [];

        angular.forEach($scope.selectedAssignatura.estudiants, function(estudiant, key) {

            console.log("Alumnes inscrits en", $scope.selectedAssignatura.nom, ":", estudiant);

            $http.get('/api/estudiant/' + estudiant)
                .success(function(data) {
                    $scope.estudiant = data;
                    console.log($scope.estudiant.nom);
                    listestudiants.push($scope.estudiant.nom); //Añade nombre estudiante dentro de lista
                    $scope.estudiantsList = listestudiants;
                    console.log("Noms dels alumnos en", $scope.selectedAssignatura.nom, ":", $scope.estudiantsList);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        });


    };

    // Función para coger el Estudiant seleccionado en la tabla
    $scope.selectEstudiant = function(estudiants) {
        $scope.table2 = true;
        $scope.selectedEstudiant = estudiants;
        $scope.selected = true;
        console.log($scope.selectedEstudiant);

        $http.get('/api/estudiant/' + $scope.selectedEstudiant)
            .success(function(data) {
                $scope.estudiants = data;
                console.log($scope.estudiants);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };
});

