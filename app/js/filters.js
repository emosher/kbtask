/**
 * Filters for KB Task.
 * 
 * @module taskApp
 * @submodule filters
 */
angular.module("taskApp.filters", []).
    
    /**
     * Get unassigned task from a given list of tasks.
     * 
     * @param tasks {Array} tasks to filter
     * @return unassigned {Array} all unassigned tasks
     */
    filter("unassigned", function() {
        return function(tasks) {
            var unassigned = [];
            angular.forEach(tasks, function(task) {
                if (task.assignedTo === []) {
                    unassigned.push(task);
                }
            });
            return unassigned;
        };
    }). 
    
    /**
     * Filter the beginning of an array, for use with pagination. Should be used in 
     * Angular's ng-repeat.
     * Reference: http://jsfiddle.net/xncuf (Andy Joslin)
     * 
     * @param input {Array} the array to filter
     * @param start {String} number to start from
     * @return {Array} the shortened array
     */
    filter("startFrom", function() {
        return function(input, start) {
            // Convert to an int
            start = +start;
            return input.slice(start);
        };
    }). 
    
    /**
     * Show "Unassigned" on the page if the task is unassigned or remove array 
     * notation if the task is assigned.
     * 
     * @param assigned {Array} who the task is assigned to
     * @return {String} either the users the task is assigned to, or the string "Unassigned"
     */
    filter("prettifyAssigned", function() {
        return function(assigned) {
            if (!angular.isUndefined(assigned)) {
                if (assigned.length === 0) {
                    return "Unassigned";
                } 
            } else {
                return assigned.toString().replace(/,/g, ", ");
            }
        };
    }).
    
    /**
     * Cycle through an array as if it were circular.
     * 
     * @param list {Array} the array to cycle through
     * @param numberToShow {Number} the number of items to keep in the list
     * @param index {Number} the index to start from
     * @return {Array} the portion of the array to show on the screen
     */
    filter("cycle", function() {
        return function(list, numberToShow, index) {
            var returnList = [], currentIndex = index;
            for (var i = 0; i < numberToShow; i++) {
                returnList.push(list[currentIndex]);
                currentIndex = (currentIndex + 1) % list.length;
            }
            return returnList;
        }
    }). 
    
    /**
     * Filter a list based on it being assigned to a user.
     * 
     * @param list {Array} the array to filter
     * @param user {String} the user to filter bv
     * @return {Array} If no user is supplied return the original list. If a user is 
     *      supplied return the list with only the tasks assigned to the user.
     */
    filter("assignedToUser", function() {
        return function(list, user) {
            var returnList;
            if (user === "") {
                returnList = list;
            } else {
                returnList = [];
                angular.forEach(list, function(task) {
                    // If one of the users assigned matches the supplied user ...
                    if (task.assignedTo.indexOf(user) > -1) {
                        // ... add to return list.
                        returnList.push(task);
                    }
                });
            }
            return returnList;
        };
    }). 
    
    /**
     * Truncate a string of text so that it is no longer than the limit in characters.
     * 
     * @param text {String} the text to truncate
     * @param limit {Number} the limit of the truncated string
     * @return {String} the truncated string
     */
    filter("truncate", function() {
        return function(text, limit) {
            // If the limit is greater than the string, do nothing
            if (limit > text.length) {
                return text;
            } else {
                // otherwise truncate the string and add "..."
                return text.substring(0, limit) + " . . .";
            }
        };
    });
