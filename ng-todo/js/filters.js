angular.module('StupidFilters', []).filter('altCaps', function() {
  return function(input) {
    var charArray = input.split('');
    charArray = charArray.map(function(el,index) {
      return index % 2 === 0 ? el.toLowerCase(el) : el.toUpperCase(el);
    });
    return charArray.join('');
  };
});