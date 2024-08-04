/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/chain-function";
exports.ids = ["vendor-chunks/chain-function"];
exports.modules = {

/***/ "(ssr)/./node_modules/chain-function/index.js":
/*!**********************************************!*\
  !*** ./node_modules/chain-function/index.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\nmodule.exports = function chain(){\n  var len = arguments.length\n  var args = [];\n\n  for (var i = 0; i < len; i++)\n    args[i] = arguments[i]\n\n  args = args.filter(function(fn){ return fn != null })\n\n  if (args.length === 0) return undefined\n  if (args.length === 1) return args[0]\n\n  return args.reduce(function(current, next){\n    return function chainedFunction() {\n      current.apply(this, arguments);\n      next.apply(this, arguments);\n    };\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY2hhaW4tZnVuY3Rpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjs7QUFFQSxtQ0FBbUMsbUJBQW1COztBQUV0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb25nYXNzb2NpYXRpb25oZWxwZXIvLi9ub2RlX21vZHVsZXMvY2hhaW4tZnVuY3Rpb24vaW5kZXguanM/ZmU2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2hhaW4oKXtcbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgdmFyIGFyZ3MgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cblxuICBhcmdzID0gYXJncy5maWx0ZXIoZnVuY3Rpb24oZm4peyByZXR1cm4gZm4gIT0gbnVsbCB9KVxuXG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHJldHVybiBhcmdzWzBdXG5cbiAgcmV0dXJuIGFyZ3MucmVkdWNlKGZ1bmN0aW9uKGN1cnJlbnQsIG5leHQpe1xuICAgIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgICBjdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBuZXh0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/chain-function/index.js\n");

/***/ })

};
;