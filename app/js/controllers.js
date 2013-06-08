/**
 * Controller for KB Task app
 * Reference: https://groups.google.com/forum/#!topic/angular/UF8Np3B0Lr4
 * 
 * @module taskApp
 * @submodule controllers
 */
angular.module("taskApp.controllers", []).
    
    /**
     * Controller for the home view. It lets the user cycle through users,
     * showing the managers and workers.
     */
    controller("homeCtrl", ["$scope", "$filter", "Tasks", "Users", function($scope, $filter, Tasks, Users) {
        
        // Number of tasks to show and users to show on the page
        $scope.tasksToShow = 4, $scope.usersToShow = 4;
        // Current indexes
        $scope.nextTasks = 0, $scope.nextManager = 0, $scope.nextWorker = 0;
        // $scope.tasks = $filter("unassigned")(Tasks.getBacklog());
        $scope.workers = Users.getWorkers(), $scope.managers = Users.getManagers();
        
        $scope.user = "";
        $scope.userDetails = false;
        $scope.counts = Tasks.getCounts();
        
        // When task is added update counts
        $scope.$on("TaskAdded", function() {
            $scope.counts = Tasks.getCounts();
        });
        
        /**
         * Cycle to next set of workers.
         */
        $scope.nextWorkers = function() {
            $scope.nextWorker = ($scope.nextWorker + $scope.usersToShow) % $scope.workers.names.length;
        };
        
        /**
         * Cycles to the next set of managers.
         */
        $scope.nextManagers = function() {
            $scope.nextManager = ($scope.nextManager + $scope.usersToShow) % $scope.managers.names.length;
        };
        
        /**
         * Returns the number of in progress tasks assigned to a user.
         */
        $scope.countUserTasks = function(user) {
            return Tasks.countUserTasks(user);
        };
        
        /**
         * Opens the user details modal.
         */
        $scope.openDetailsModal = function(user) {
            $scope.user = user;
            $scope.userDetails = true;
        };
        
        /**
         * Closes the user details modal and clears the data.
         */
        $scope.closeDetailsModal = function() {
            $scope.user = "";
            $scope.userDetails = false;
        };
        
    }]). 
    
    /**
     * Controller for the user detail modal in the home screen.
     */
    controller("userDetailCtrl", ["$scope", "$location", "Tasks", function($scope, $location, Tasks) {
        
        $scope.userData = {};
        $scope.$watch("user", function(newValue) {
            $scope.userData = Tasks.getUserCounts(newValue);
        });
        
        $scope.seeAll = function() {
            var user = $scope.user;
            $scope.user = "";
            $scope.userDetails = false;
            $location.path("/" + user);
        };
        
    }]). 
    
    /**
     * Controller for the add task modal. It passes a new task to the Tasks service.
     */
    controller("addCtrl", ["$scope", "Tasks", "$rootScope", "Users", function($scope, Tasks, $rootScope, Users) {
        
        // Inits
        $scope.title = "", $scope.description = "", $scope.managers = [], 
            $scope.workers = [];
            
        // Select box inits
        $scope.managerSelect = [], $scope.workerSelect = [];
        
        $scope.$on("ConfigLoaded", function() {
            $scope.managers = Users.getManagerNames();
            $scope.workers = Users.getWorkerNames();
        });
        
        $scope.clear = function() {
            $scope.title = "", $scope.description = "", $scope.managerSelect = [],
                $scope.workerSelect = [];
        };
        
        // Send a new task to the Tasks service
        $scope.addTask = function() {
            var newTask = {
                title: $scope.title,
                description: $scope.description,
                assignedTo: $scope.managerSelect.concat($scope.workerSelect),
                status: "backlog"
            };
            $scope.title = "", $scope.description = "", $scope.managerSelect = [],
                $scope.workerSelect = [];
            Tasks.addTask(newTask);
            $rootScope.$broadcast("TaskAdded");
        };
        
    }]). 
    
    /**
     * Controller for the Kanban view. Allows the user to manipulate 
     * the status of the tasks.
     */
    controller("kanbanCtrl", ["$scope", "routeParams", "$filter", "Tasks", function($scope, $routeParams, $filter, Tasks) {
        
        // Task being viewed or edited
        $scope.currTask = {};
        // Flags corresponding to view/edit modal
        $scope.viewTask = false;
        $scope.editTask = false;
        
        // If we have a $routeParam, then the view corresponds to one user
        if ($routeParams.user) {
            $scope.user = $routeParams.user;
        } else {
            $scope.user = "";
        }
        
        // If viewing a single user's tasks, filter the tasks
        var assignedToUser = $filter("assignedToUser");
        $scope.backlog = assignedToUser(Tasks.getBacklog(), $scope.user);
        $scope.inProgress = assignedToUser(Tasks.getInProgress(), $scope.user);
        $scope.complete = assignedToUser(Tasks.getComplete(), $scope.user);
        
        $scope.$on("TaskAdded", function() {
            $scope.backlog = assignedToUser(Tasks.getBacklog(), $scope.user);
            $scope.inProgress = assignedToUser(Tasks.getInProgress(), $scope.user);
            $scope.complete = assignedToUser(Tasks.getComplete(), $scope.user);
        });
        
        $scope.$on("TaskEdited", function() {
            $scope.backlog = assignedToUser(Tasks.getBacklog(), $scope.user);
            $scope.inProgress = assignedToUser(Tasks.getInProgress(), $scope.user);
            $scope.complete = assignedToUser(Tasks.getComplete(), $scope.user);
            // Close edit modal
            $scope.currTask = {};
            $scope.editTask = false;
        });
        
        $scope.backlogEmpty = function() {
            return $scope.backlog.length === 0;
        };
        
        $scope.inProgressEmpty = function() {
            return $scope.inProgress.length === 0;
        };
        
        $scope.completeEmpty = function() {
            return $scope.complete.length === 0;
        };
        
        $scope.updateStatus = function(task, newStatus) {
            Tasks.updateStatus(task, newStatus);
        };
        
        $scope.openViewModal = function(task) {
            $scope.currTask = task;
            $scope.viewTask = true;
        };
        
        $scope.closeViewModal = function() {
            $scope.currTask = {};
            $scope.viewTask = false;
        };
        
        $scope.openEditModal = function(task) {
            $scope.currTask = task;
            $scope.editTask = true;
        };
        
        $scope.closeEditModal = function() {
            $scope.currTask = {};
            $scope.editTask = false;
        };
        
        $scope.delButton = function(task) {
            // Remove from Tasks service
            Tasks.remove(task.id);
            $scope.backlog = assignedToUser(Tasks.getBacklog(), $scope.user);
            $scope.inProgress = assignedToUser(Tasks.getInProgress(), $scope.user);
            $scope.complete = assignedToUser(Tasks.getComplete(), $scope.user);
        };
        
    }]). 
    
    /**
     * Controller for the view task modal.
     */
    controller("viewTaskCtrl", ["$scope", function($scope) {
        $scope.$watch("currTask", function(newValue) {
            $scope.title = newValue.title;
            $scope.description = newValue.description;
            $scope.assignedTo = newValue.assignedTo;
            $scope.status = newValue.status;
        });
    }]).
    
    /**
     * Controller for edit task modal.
     */
    controller("editCtrl", ["$scope", "Users", "Tasks", function($scope, Users, Tasks) {
        // Temp function to break up assignedTo into workers and managers
        var formatAssigned = function(group, assigned) {
            var retAssigned = [];
            if (group === "managers") {
                angular.forEach(assigned, function(user) {
                    if ($scope.managers.indexOf(user) > -1) {
                        retAssigned.push(user);
                    }
                });
            } else if (group === "workers") {
                angular.forEach(assigned, function(user) {
                    if ($scope.workers.indexOf(user) > -1) {
                        retAssigned.push(user);
                    }
                });
            }
            return retAssigned;
        };
        
        $scope.managers = Users.getManagerNames();
        $scope.workers = Users.getWorkerNames();
        
        $scope.$watch("currTask", function(newValue) {
            $scope.id = newValue.id;
            $scope.title = newValue.title;
            $scope.description = newValue.description;
            $scope.managerSelect = formatAssigned("managers", newValue.assignedTo);
            $scope.workerSelect = formatAssigned("workers", newValue.assignedTo);
            $scope.status = newValue.status;
        });
        
        $scope.save = function() {
            Tasks.save($scope.id, {
                title: $scope.title,
                description: $scope.description,
                assignedTo: $scope.managerSelect.concat($scope.workerSelect),
                status: $scope.status
            });
            
            // Fire event to update view and close modal
            $scope.$emit("TaskEdited");
        };
        
    }]);