angular.module('StupdDirectives', []).directive('completeColor', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.completeColor, function (value) {
        element.css('color', (value ? 'yellow' : 'limegreen'));
      });
    }
  }
})