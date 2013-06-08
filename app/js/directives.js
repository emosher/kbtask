/**
 * Directives for use with the KB Task.
 * 
 * @module taskApp
 * @submodule directives
 */
angular.module("taskApp.directives", []). 
    
    /**
     * dndBacklog directive
     */
    directive("dndBacklog", function() {
        
        var dnd = {
            restrict: "A",
            link: function(scope, element, attrs) {
                // The drag/drop lists to watch
                var backlog = [], inProgress = [], complete = [];
                // The start of a drag
                var startIndex = -1;
                
                // Watch for changes in all 3 lists
                scope.$watch("backlog", function(newValue) {
                    backlog = newValue;
                });
                
                scope.$watch("inProgress", function(newValue) {
                    inProgress = newValue;
                });
                
                scope.$watch("complete", function(newValue) {
                    complete = newValue;
                });
                
                // Make the list sortable
                element.sortable({
                    
                    items: "li",
                    start: function(event, ui) {
                        // Save the item dragged
                        startIndex = ($(ui.item)).index();
                    },
                    stop: function(event, ui) {
                        // Where the item was dropped
                        var newParent = $(ui.item[0]).parent().attr("id"),
                            newIndex = ($(ui.item)).index(), 
                            itemToMove = backlog[startIndex];
                        
                        backlog.splice(startIndex, 1);
                        
                        if (newParent === "backlog") {
                            backlog.splice(newIndex, 0, itemToMove);
                        } else if (newParent === "inProgress") {
                            inProgress.splice(newIndex, 0, itemToMove);
                        } else {
                            complete.splice(newIndex, 0, itemToMove);
                        }
                        
                        scope.$apply(newParent);
                        scope.$apply("backlog");
                        scope.$apply(scope.updateStatus(itemToMove, newParent));
                        
                    },
                    
                    connectWith: ".dnd-column"
                });
            }
        };
        return dnd;
    }). 
    
    directive("dndInProgress", function() {
        
        var dnd = {
            
            restrict: "A",
            
            link: function(scope, element, attrs) {
                // The drag/drop lists to watch
                var backlog = [], inProgress = [], complete = [];
                // The start of a drag
                var startIndex = -1;
                
                // Watch for changes in all 3 lists
                scope.$watch("backlog", function(newValue) {
                    backlog = newValue;
                });
                
                scope.$watch("inProgress", function(newValue) {
                    inProgress = newValue;
                });
                
                scope.$watch("complete", function(newValue) {
                    complete = newValue;
                });
                
                // Make the list sortable
                element.sortable({
                    
                    items: "li",
                    start: function(event, ui) {
                        // Save the item dragged
                        startIndex = ($(ui.item)).index();
                    },
                    stop: function(event, ui) {
                        // Where the item was dropped
                        var newParent = $(ui.item[0]).parent().attr("id"),
                            newIndex = ($(ui.item)).index(), 
                            itemToMove = inProgress[startIndex];
                        
                        inProgress.splice(startIndex, 1);
                        
                        if (newParent === "backlog") {
                            backlog.splice(newIndex, 0, itemToMove);
                        } else if (newParent === "inProgress") {
                            inProgress.splice(newIndex, 0, itemToMove);
                        } else {
                            complete.splice(newIndex, 0, itemToMove);
                        }
                        
                        scope.$apply(newParent);
                        scope.$apply("inProgress");
                        scope.$apply(scope.updateStatus(itemToMove, newParent));
                        
                    },
                    
                    connectWith: ".dnd-column"
                });
            }
        };
        return dnd;
    }).
    
    directive("dndComplete", function() {
        
        var dnd = {
            restrict: "A",
            link: function(scope, element, attrs) {
                // The drag/drop lists to watch
                var backlog = [], inProgress = [], complete = [];
                // The start of a drag
                var startIndex = -1;
                
                // Watch for changes in all 3 lists
                scope.$watch("backlog", function(newValue) {
                    backlog = newValue;
                });
                
                scope.$watch("inProgress", function(newValue) {
                    inProgress = newValue;
                });
                
                scope.$watch("complete", function(newValue) {
                    complete = newValue;
                });
                
                // Make the list sortable
                element.sortable({
                    
                    items: "li",
                    start: function(event, ui) {
                        // Save the item dragged
                        startIndex = ($(ui.item)).index();
                    },
                    stop: function(event, ui) {
                        // Where the item was dropped
                        var newParent = $(ui.item[0]).parent().attr("id"),
                            newIndex = ($(ui.item)).index(), 
                            itemToMove = complete[startIndex];
                        
                        complete.splice(startIndex, 1);
                        
                        if (newParent === "backlog") {
                            backlog.splice(newIndex, 0, itemToMove);
                        } else if (newParent === "inProgress") {
                            inProgress.splice(newIndex, 0, itemToMove);
                        } else {
                            complete.splice(newIndex, 0, itemToMove);
                        }
                        
                        scope.$apply(newParent);
                        scope.$apply("complete");
                        scope.$apply(scope.updateStatus(itemToMove, newParent));
                        
                    },
                    
                    connectWith: ".dnd-column"
                });
            }
        };
        return dnd;
    });
