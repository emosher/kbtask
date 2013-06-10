/**
 * Services
 */
angular.module("taskApp.services", []). 

    /**
     * Service handling the task data.
     * Reference: http://onehungrymind.com/angularjs-sticky-notes-pt-1-architecture/
     */
    service("Tasks", ["$rootScope", function($rootScope) {
        
        // Dummy data goes here
        var tasks = [
            {
                title: "Build a task app",
                description: "We need to create a task application based on the Kanban methodology",
                assignedTo: ["Joe", "Jim"],
                status: "inProgress"
            },
            {
                title: "Get car fixed",
                description: "Take the car into the shop",
                assignedTo: ["Joe", "Bob"],
                status: "backlog"
            },
            {
                title: "Buy groceries",
                description: "Need to buy eggs, milk, chicken, and cheerios",
                assignedTo: ["Eric"],
                status: "complete"
            }
        ], currId = 3;
        
        // Private fn
        var findById = function(id) {
            var index = -1, length = tasks.length, i;
            for (i = 0; i < length; i++) {
                if (tasks[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        
        var addTask = function (task) {
            currId++;
            task.id = currId;
            tasks.push(task);
        };
        
        var getAll = function() {
            return tasks;
        };
        
        var getBacklog = function() {
            var backlog = [];
            angular.forEach(tasks, function(task) {
                if (task.status === "backlog") {
                    backlog.push(task);
                }
            });
            return backlog;
        };
        
        var getInProgress = function() {
            var inProgress = [];
            angular.forEach(tasks, function(task) {
                if (task.status === "inProgress") {
                    inProgress.push(task);
                }
            });
            return inProgress;
        };
        
        var getComplete = function() {
            var complete = [];
            angular.forEach(tasks, function(task) {
                if (task.status === "complete") {
                    complete.push(task);
                }
            });
            return complete;
        };
        
        var getUserTasks = function(user) {
            var userTasks = [];
            angular.forEach(tasks, function(task) {
                if (task.assignedTo === user) {
                    userTasks.push(task);
                }
            });
            return userTasks;
        };
        
        var countUserTasks = function(user) {
            var userTasks = 0;
            angular.forEach(tasks, function(task) {
                if ((task.assignedTo.indexOf(user) !== -1) && (task.status === "inProgress")) {
                    userTasks++;
                }
            });
            return userTasks;
        };
        
        var updateStatus = function(task, newStatus) {
            tasks[$.inArray(task, tasks)].status = newStatus;
        };
        
        var getUserCounts = function(user) {
            // Must supply a user
            if (user === "") {
                return {};
            } else {
                var debug = 0;
                var backlogCount = 0, inProgressCount = 0, completeCount = 0;
                angular.forEach(tasks, function(task) {
                    debug++;
                    if (task.assignedTo.indexOf(user) !== -1) {
                        switch (task.status) {
                        case "backlog":
                            backlogCount++;
                            break;
                        case "inProgress":
                            inProgressCount++;
                            break;
                        case "complete":
                            completeCount++;
                            break;    
                        }
                    }
                });
            }
            return {
                backlog: backlogCount,
                inProgress: inProgressCount,
                complete: completeCount
            };
        };
        
        var getCounts = function() {
            var backlogCount = 0, inProgressCount = 0, completeCount = 0;
            angular.forEach(tasks, function(task) {
                switch (task.status) {
                case "backlog":
                    backlogCount++;
                    break;
                case "inProgress":
                    inProgressCount++;
                    break;
                case "complete":
                    completeCount++;
                    break;
                }
            });
            return {
                backlog: backlogCount,
                inProgress: inProgressCount,
                complete: completeCount
            };
        };
        
        var save = function(id, task) {
            var index = findById(id);
            tasks[index].title = task.title;
            tasks[index].description = task.description;
            tasks[index].assignedTo = task.assignedTo;
            tasks[index].status = task.status;
        };
        
        var remove = function(id) {
            var index = findById(id);
            tasks.splice(index, 1);
        };
        
        return {
            addTask: addTask,
            getAll: getAll,
            getBacklog: getBacklog,
            getInProgress: getInProgress,
            getComplete: getComplete,
            getUserTasks: getUserTasks,
            countUserTasks: countUserTasks,
            updateStatus: updateStatus,
            getUserCounts: getUserCounts,
            getCounts: getCounts,
            save: save,
            remove: remove
        };
        
    }]).
    
    /**
     * Users service
     */
    service("Users", ["$http", "$rootScope", function($http, $rootScope) {
        var workers = {
            names: ["Joe", "Jill", "Bob", "Linda", "Eddie"]
        }, managers = {
            names: ["Jim", "Terry", "Stephanie", "Doug", "Bill", "Will", "Eric"]
        };
        /** 
         * Legacy...
        
        $http.get("config/configuration.json").success(function(data) {
            workers = data.workers;
            managers = data.managers;
            $rootScope.$broadcast("ConfigLoaded");
        });
        
         */
        
        var getWorkers = function() { 
            return workers;
        };
        
        var getManagers = function() {
            return managers;
        };
        
        var getWorkerNames = function() {
            return workers.names;
        };
        
        var getManagerNames = function() {
            return managers.names;
        };
        
        return {
            getWorkers: getWorkers,
            getManagers: getManagers,
            getWorkerNames: getWorkerNames,
            getManagerNames: getManagerNames
        };
        
    }]);
