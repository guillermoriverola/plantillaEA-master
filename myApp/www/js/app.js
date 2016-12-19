// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/home',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('app.students', {
      url: '/students',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/students.html',
          controller: 'studentsCtrl'
        }
      }
    })

    .state('app.studentsDetail', {
      url: '/students/:studentId', //Le pasa la ID del estudiante
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/studentsDetail.html',
          controller: 'studentsDetailCtrl'
        }
      }
    })
    .state('app.subjects', {
      url: '/subjects',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/subjects.html',
          controller: 'subjectsCtrl'
        }
      }
    })
    .state('app.subjectsDetail', {
      url: '/subjects/:subjectId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/subjectsDetail.html',
          controller: 'subjectsDetailCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
