'use strict';

// SisoController
angular.module('sisoweb').controller('SisoController', ['$scope', '$http', '$location', 'Sisoweb',
  function ($scope, $http, $location, Sisoweb) {    

    $scope.showCheckOutDiv = false;
    // Create new Profile
    $scope.create = function (req, res) {      
      // Create new Profile object
      var sisoweb = new Sisoweb({
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        mfname: this.mfname,
        mlname: this.mlname,
        contact: this.contact,
        location: this.location,
        time: this.time	
      });      
      // Redirect after save
      sisoweb.$save(function (err) {       
        console.log('after save'); 
        // Clear form fields
        $scope.fname = '';
        $scope.mname = '';
        $scope.lname = '';
        $scope.mfname = '';
        $scope.mlname = '';
        $scope.contact = '';
        $scope.location = '';
        $scope.time = '';	                                 
      });
    };   

    // Find a list of sisoweb
    $scope.find = function () {
      console.log('in find'); 	
      $scope.sisos = Sisoweb.query();
    };

     // Find a list user checkins for Manager
    $scope.listByManager = function (req, res) {
      console.log('in sisoweb client controller listByManager(firstname): '+this.mfname+', lastname: '+this.mlname);
   
      Sisoweb.query({ mfname:this.mfname,mlname:this.mlname }, function (sisos) {
        console.log('sisoweb.client.controller, response : '+JSON.stringify(sisos));
        $scope.sisos = sisos;
        // Clear form fields
        $scope.mfname = '';
        $scope.mlname = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list user checkins for Manager
    $scope.findUser = function (req, res) {
      console.log('in sisoweb client controller findUser(firstname): "+this.fname+", lastname: '+this.lname);
      $scope.showMessageDiv = false;
      $scope.showCheckOutDiv = false;
      $scope.showNoUserFoundDiv = false;
    
      Sisoweb.query({ fname:this.fname,lname:this.lname }, function (sisos) {
        //console.log("sisoweb.client.controller, response : "+JSON.stringify(sisos));
        $scope.siso = sisos[0];
        // Clear form fields
        $scope.mfname = '';
        $scope.mlname = '';
        var sisoObj = JSON.stringify($scope.siso);
        //console.log("sisoweb.client.controller, Single response : "+ sisoObj);
        if(undefined === sisoObj) {
          $scope.showNoUserFoundDiv = true;
        } else {
          $scope.showCheckOutDiv = true;
        }
      }, function (errorResponse) {
        //console.log('************ ERROR ****************');
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Profile
    $scope.remove = function (siso) {      
      $scope.showCheckOutDiv = false;
      $scope.showMessageDiv = true;
      if (siso) {
        //console.log('sisoweb.client.controller, $scope.remove - '+siso);
        siso.$remove();
      } else {
        //console.log('sisoweb.client.controller, $scope.remove else ***** :'+JSON.stringify($scope.siso));
        $scope.siso.$remove(function () {
          $location.path('sisoweb');
        });
      }
    };
  }
]);
