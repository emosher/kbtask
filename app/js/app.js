/**
 * Angular module for the KB Task app. Dependencies and configurations.
 * 
 * @module taskApp
 */
angular.module("taskApp", [ "taskApp.controllers", "taskApp.services", "taskApp.directives", 
    "taskApp.filters", "ui.bootstrap.modal", "ui"]).
    config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "partials/home.html",
            controller: "homeCtrl"
        }).when("/update", {
            templateUrl: "partials/update.html",
            controller: "updateCtrl"
        }).when("/:user", {
            templateUrl: "partials/update.html",
            controller: "updateCtrl"
        }).otherwise({
            redirectTo: "/home"
        });
    }]);
