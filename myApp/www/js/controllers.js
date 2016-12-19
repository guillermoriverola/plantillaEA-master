angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
    url: 'http://localhost:8080/api'
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('homeCtrl', function($scope, $http, ApiEndpoint, $ionicPopup) {

  $scope.message = "¡Bienvenido!";
  $scope.newEstudiant = {};
  $scope.selected = false;

  // Función para registrar estudiante
  $scope.registrarEstudiante = function() {
    $http.post(ApiEndpoint.url + '/estudiant', $scope.newEstudiant)
      .success(function(data) {
        $scope.newEstudiant = {}; // Borramos los datos del formulario
        console.log('Registrado correctamente');
        $scope.estudiants = data;
        var alertPopup = $ionicPopup.alert({
          title: 'Información',
          template: 'Registrado correctamente'
        });
      })
      .error(function(data) {
        console.log('Error: ' + data);
        var alertPopup = $ionicPopup.alert({
          title: 'Información',
          template: 'Revisa el formulario'
        });
      });
  };
})

.controller('subjectsCtrl', function($scope, $http, ApiEndpoint, $ionicPopup) {
  $scope.message = "Página asignaturas";
  $scope.newAssignatura = {};
  $scope.assignatures = {};

  // Añadir nueva asignatura
  $scope.registrarAsignatura = function() {
    $http.post(ApiEndpoint.url + '/assignatura', $scope.newAssignatura)
      .success(function(data) {
        $scope.newAssignatura = {}; // Borramos los datos del formulario
        console.log('Asignatura registrada correctamente');
        console.log(data);
        $scope.assignatures = data;
        var alertPopup = $ionicPopup.alert({
          title: 'Información',
          template: 'Asignatura registrada correctamente'
        });
      })

      .error(function(data) {
        console.log('Error: ' + data);
        var alertPopup = $ionicPopup.alert({
          title: 'Información',
          template: 'Revisa el formulario'
        });
      });
  };

  // Obtenemos todas las asignaturas
  $http.get(ApiEndpoint.url + '/assignatura').success(function(data) {
    $scope.assignatures = data;
    console.log('Get Data: ' + data);
  })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Obtenemos todos los datos de la base de datos
  $scope.buscarAssignaturanom = function() {
    console.log($scope.newAssignatura.nom)
    $http.post('http://localhost:8080/api/assignaturaName/' + $scope.newAssignatura.nom)
      .success(function(data) {
        console.log($scope.newAssignatura.nom)
        $scope.newAssignatura = {}; // Borramos los datos del formulario
        $scope.assignatures = data;

      })
      .error(function(data) {
        console.log($scope.assignatures)
        console.log('Error: ' + data);
      });
  };

  // Obtenemos todos los datos de la base de datos
  $scope.buscarAssignaturesperiode = function() {
    console.log($scope.newAssignatura.when)
    $http.post('http://localhost:8080/api/assignaturaWhen/' + $scope.newAssignatura.when)
      .success(function(data) {
        console.log($scope.newAssignatura.when)
        $scope.newAssignatura = {}; // Borramos los datos del formulario
        $scope.assignatures = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Obtenemos todos los datos de la base de datos
  $scope.buscarAssignaturesperiode2 = function() {
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


})

.controller('subjectsDetailCtrl', function($scope, $http, ApiEndpoint, $state, $ionicPopup) {

  $scope.message = "Estudiantes matriculados";
  $scope.selectedAssignatura = {};
  $scope.updatedAssingatura = {};
  $scope.newEstudiant = {};
  $scope.estudiantsList = {};
  $scope.assignatura = {};
  $scope.subjectID = ($state.params.subjectId); //Obtenemos ID de la URI de subjectId
  console.log($scope.subjectID);
  var listestudiants = [];

  // Función para eliminar asignatura
  $scope.deleteAssignatura = function(id) {
    $http.delete(ApiEndpoint.url + '/assignatura/' + id)
      .success(function(data) {
        console.log("Assignatura", id, "eliminada correctamente.", data);
        $state.go('app.subjects');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Función para eliminar estudiante
  $scope.remove = function(id) {
    $http.delete(ApiEndpoint.url + '/estudiant/' + id)
      .success(function(data) {
        console.log("Estudiante", id, "eliminado correctamente.", data);
        $state.go('app.students');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  //Obtenemos detalle estudiante
  $http.get(ApiEndpoint.url + '/assignatura/' + $scope.subjectID)
    .success(function(data) {
      $scope.assignatura = data;
      console.log($scope.assignatura);

      // Función para mostrar el nombre de usuario en vez de su ID
      angular.forEach($scope.assignatura.estudiants, function(estudiant, key) {
          $http.get(ApiEndpoint.url + '/estudiant/' + estudiant)
            .success(function(data) {
              $scope.estudiant = data;
              listestudiants.push($scope.estudiant); //Añade nombre estudiante dentro de lista
              $scope.estudiantsList = listestudiants;
              console.log("Nombre de alumnos en", $scope.assignatura.nom, ":", $scope.estudiantsList);
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
      });
      // FIN función para mostrar el nombre de usuario en vez de su ID
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para añadir alumno a asignatura
  $scope.addEstudiant = function() {
    console.log($scope.subjectID);
    console.log($scope.newEstudiant);
    $http.post(ApiEndpoint.url + '/assignatura/' + $scope.subjectID, $scope.newEstudiant)
      .success(function(data) {
        $scope.assignatura = data;
        $state.reload();
        //location.reload();
        console.log($scope.assignatura);
        console.log('Añadido correctamente a la asignatura');
        //PopUp
        if ($scope.assignatura == null){
          var alertPopup = $ionicPopup.alert({
            title: 'Información',
            template: 'Este usuario no existe o ya está en la lista'
          });
        }
        else
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Información',
            template: 'Añadido correctamente'
          });
        }
      })
      .error(function(data) {
        console.log('Error: ' + data);
        var alertPopup = $ionicPopup.alert({
          title: 'Información',
          template: 'Ese estudiante no existe'
        });
      });
  };

})

.controller('studentsCtrl', function($scope, $http, ApiEndpoint, $state, $ionicPopup) {
  $scope.message = "Página estudiantes";
  $scope.students = {};
  $scope.estudiants = {};
  $scope.filtre = {};

  $scope.getEstudiantsOrder = function() {
    $http.get(ApiEndpoint.url + '/estudiantorder').success(function(data) {
        console.log("Ok");
        $scope.estudiants = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Obtenemos todos los estudiantes
  $http.get(ApiEndpoint.url + '/estudiant').success(function(data) {
    $scope.estudiants = data;
    console.log('Get Data: ' + data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.buscarEstudiantNom = function() {
    console.log($scope.filtre.nom)
    $http.post('http://localhost:8080/api/estudiantName/' + $scope.filtre.nom)
      .success(function(data) {
        console.log($scope.filtre.nom)
        $scope.filtre = {}; // Borramos los datos del formulario
        $scope.estudiants = data;
        console.log($scope.estudiants)

      })
      .error(function(data) {
        console.log($scope.estudiants)
        console.log('Error: ' + data);
      });
  };

  $scope.buscarEstudiantNom2 = function(filtre) {
    console.log(filtre.nom);
    if(filtre == undefined)
    {
      return;
    }
    if(filtre.nom == "")
      filtre.nom = undefined;

    $http.get(ApiEndpoint.url + '/estudiantName').success(function(data) {
      $scope.estudiant = data;
      console.log($scope.estudiant);
    }).error(function (data) {
      console.log("Error en el filtro "+data);
    });
    filtre = undefined;

  }

})

.controller('studentsDetailCtrl', function($scope, $http, ApiEndpoint, $state) {

  $scope.message = "Detalle estudiante";
  $scope.studentID = ($state.params.studentId); //Obtenemos ID de la URI
  console.log($scope.studentID);

  //Obtenemos detalle estudiante
  $http.get(ApiEndpoint.url + '/estudiant/' + $scope.studentID)
    .success(function(data) {
      $scope.estudiant = data;
      console.log($scope.estudiant);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para eliminar estudiante
  $scope.remove = function(id) {
    $http.delete(ApiEndpoint.url + '/estudiant/' + id)
      .success(function(data) {
        console.log("Estudiante", id, "eliminado correctamente.", data);
        $state.go('app.students');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };



});
