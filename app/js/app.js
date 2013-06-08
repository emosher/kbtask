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
        }).when("/kanban", {
            templateUrl: "partials/kanban.html",
            controller: "kanbanCtrl"
        }).when("/:user", {
            templateUrl: "partials/kanban.html",
            controller: "kanbanCtrl"
        }).otherwise({
            redirectTo: "/home"
        });
    }]);
