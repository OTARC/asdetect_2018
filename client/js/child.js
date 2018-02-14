angular.module('asdetect.child', ['openfb', 'asdetect.status','asdetect.interaction'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.child', {
                url: "/child",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/child-list.html",
                        controller: "ChildListCtrl"
                    }
                }
            })

             .state('app.edit-child', {
                url: "/edit-child/:childId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/edit-child.html",
                        controller: "ChildEditCtrl"
                    }
                }
            })

             .state('app.add-child', {
                url: "/add-child",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/add-child.html",
                        controller: "ChildAddCtrl"
                    }
                }
            })


               .state('app.child-detail', {
                url: "/child/:childId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/child-detail.html",
                        controller: "ChildDetailCtrl"
                    }
                }
            })




           

    })


    .factory('Gender', function() {

        var genders = [
            { text: 'Male', value: 'Male' },
            { text: 'Female', value: 'Female' }     
        ];

        return {
            all: function() {
                return genders;
            }
        }
    })


        .factory('Diag', function() {

        var diagnoses = [
          { text: 'None', value: 'None' },
            { text: 'PDD', value: 'PDD' },
            { text: 'Aspergers', value: 'Aspergers' },
            { text: 'Autism Spectrum', value: 'Austism Spectrum' },
            { text: 'Other', value: 'Other' }

        ];

        return {
            all: function() {
                return diagnoses;
            }
        }
    })

        


    // Services
    .factory('Child', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/child');
            },
            get: function(childId) {
                console.log('in Child.get');
                return $http.get($rootScope.server.url + '/child/' + childId);
            },
            create: function(childItem) {
                return $http.post($rootScope.server.url + '/child',childItem);
            }
        };
    })

    //Controllers
    .controller('ChildListCtrl', function ($scope, $rootScope, $ionicPopup, $ionicModal, Child, User, Interaction) {
        
        Child.all().success(function(children) {
            $scope.children = children;

        });


 $scope.doRefresh = function() {
            Child.all().success(function(children) {
                $scope.children = children;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        
       
    })


      .controller('ChildEditCtrl', function ($scope, $rootScope, $stateParams, $ionicPopup, $ionicModal, Child, Diag, Gender,User, Status, Interaction) {
        
        Child.get($stateParams.childId).success(function(child) {
            
            $scope.child = child;
            $scope.genders = Gender.all();  
            $scope.diagnoses = Diag.all();  


        });

        $scope.submit = function () {
            Child.create($scope.child).success(function() {
                $ionicPopup.alert({title: 'Thank You', content: 'Child record edited.'});
            });
  

          

       }
    })


            .controller('ChildAddCtrl', function ($scope, $rootScope, $stateParams, $ionicPopup, $ionicModal, Child, Diag, Gender,User, Status, Interaction) {
        
        
            
            $scope.child = {};
            $scope.genders = Gender.all();  
            $scope.diagnoses = Diag.all(); 



        $scope.submit = function () {
            Child.create($scope.child).success(function(data) {
                
                /*
                var initials=$scope.child.childs_initials__c;
                var extid=data.externalchildid__c;
             Interaction.create({type__c: "Add Child", description__c:"Child record added ("+initials+") :Angular child module",externalchildid__c:extid})
                .success(function(status) {
                    console.log('Interaction recorded.');
                });
                */

                $ionicPopup.alert({title: 'Thank You', content: 'Child record added.'});



            })


             .error(function (err) {
                            console.log("ERROR: "+JSON.stringify(err));
                            $ionicPopup.alert({title: 'Oops', content: err});
                        });





       }
    })



      .controller('ChildDetailCtrl', function ($scope, $window, $rootScope, $stateParams, $ionicPopup, S3Uploader, Diag, Child, Gender, User, Status, Interaction) {

        
        $scope.child = {};

        Child.get($stateParams.childId).success(function(child) {
            
            $scope.child = child;


        });



    })




 

