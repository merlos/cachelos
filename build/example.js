(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/example.js":
/*!*****************************!*\
  !*** ./examples/example.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/Cache */ \"./src/Cache.js\");\n\nconsole.log('imported with success');\n\n//# sourceURL=webpack:///./examples/example.js?");

/***/ }),

/***/ "./src/Cache.js":
/*!**********************!*\
  !*** ./src/Cache.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A simple local storage cache for JSON objects\n */\nvar Cache = function Cache(_ref) {\n  var validTime = _ref.validTime;\n  var cache = {};\n  /**\n   * Cache configuration\n   */\n\n  cache.config = {\n    /**\n     * Time an item is valid by default.\n     * Expressed in milliseconds\n     */\n    validTime: validTime !== null && validTime !== void 0 ? validTime : 3600 * 1000\n  };\n\n  cache.expiresOnKey = function (url) {\n    return url + '--expiresOn';\n  };\n  /**\n   * Returns the time the `url` expires\n   * If the url does not exist returns null.\n   */\n\n\n  cache.getExpiresOn = function (url) {\n    var expiresOn = localStorage.getItem(cache.expiresOnKey(url));\n    return expiresOn ? parseInt(expiresOn) : null;\n  };\n  /**\n   * Is the entrance of the time valid\n   */\n\n\n  cache.isValid = function (url) {\n    var expiresOn = cache.getExpiresOn(url); // If expiration time exists compare with current time\n    // If does not exist it has expired.\n\n    return expiresOn ? expiresOn > Date.now() : false;\n  };\n  /**\n   * Sets expiration time for the `url`\n   */\n\n\n  cache._setExpiresOn = function (url) {\n    var expiresOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;\n    var defaultTime = Date.now() + cache.config.validTime;\n    localStorage.setItem(cache.expiresOnKey(url), expiresOn < 0 ? defaultTime : expiresOn);\n  };\n  /**\n   * Adds or updates the url item in the localStorage\n   *\n   * expiresOn is expressed in milliseconds. If negative uses the default config.\n   * Example const expires = Date.now().getTime() + 1000\n   */\n\n\n  cache.set = function (url, data) {\n    var expiresOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;\n\n    //Adds/Update expiration time\n    cache._setExpiresOn(url, expiresOn); //add/Update data\n\n\n    localStorage.setItem(url, JSON.stringify(data));\n  };\n  /**\n   *  Get item from cache\n   */\n\n\n  cache.get = function (url) {\n    return JSON.parse(localStorage.getItem(url));\n  };\n\n  return cache;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cache);\n\n//# sourceURL=webpack:///./src/Cache.js?");

/***/ })

/******/ });
});