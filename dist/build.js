/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/main.scss */ \"./src/assets/css/main.scss\");\n/* harmony import */ var _assets_css_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_js_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/api.js */ \"./src/assets/js/api.js\");\n/* harmony import */ var _assets_js_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_js_api_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n(function () {\n  /** Global Attributes */\n  var intputName = document.getElementById(\"form-fullname\");\n  var intputEmail = document.getElementById(\"form-email\");\n  var intputPassword = document.getElementById(\"form-password\");\n  var intputPassworConfirm = document.getElementById(\"form-password-confirm\");\n  var passStrength = document.getElementById(\"password-strength\");\n  var passSpecifications = Array.from(document.querySelectorAll(\"#password-specifications .spec\"));\n  var btnSubmit = document.getElementById(\"btn-submit\");\n  var formValidations = {\n    name: false,\n    email: false,\n    password: false,\n    password_confirm: false\n  };\n  console.log('carregou');\n  /** Global Handle Events */\n\n  intputName.addEventListener(\"keyup\", function (e) {\n    var isValid = validateInputName(e.target.value);\n    toggleClassesValidAndError(this, isValid);\n    formValidations[\"name\"] = isValid;\n    validateSubmitButton();\n  });\n  intputEmail.addEventListener(\"keyup\", function (e) {\n    var isValid = validateInputEmail(e.target.value);\n    toggleClassesValidAndError(this, isValid);\n    formValidations[\"email\"] = isValid;\n    validateSubmitButton();\n  });\n  intputPassword.addEventListener(\"keyup\", function (e) {\n    var isValid = validateInputPassword(e.target.value);\n    toggleClassesValidAndError(this, isValid);\n    formValidations[\"password\"] = isValid;\n    validateSubmitButton();\n\n    if (intputPassworConfirm.value.length > 0) {\n      intputPassworConfirm.value = \"\";\n      intputPassworConfirm.parentNode.classList.remove(\"error\");\n      intputPassworConfirm.parentNode.classList.remove(\"valid\");\n    }\n  });\n  intputPassworConfirm.addEventListener(\"keyup\", function (e) {\n    var isValid = validateInputPasswordConfirm(e.target.value);\n    toggleClassesValidAndError(this, isValid);\n    formValidations[\"password_confirm\"] = isValid;\n    validateSubmitButton();\n  });\n  btnSubmit.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    sendUser(this);\n  });\n  /** Validate Functions */\n\n  function toggleClassesValidAndError(element, condition) {\n    if (condition) {\n      element.parentNode.classList.add(\"valid\");\n      element.parentNode.classList.remove(\"error\");\n    } else {\n      element.parentNode.classList.add(\"error\");\n      element.parentNode.classList.remove(\"valid\");\n    }\n  }\n\n  function validateInputName(value) {\n    return value && value.length > 6;\n  }\n\n  function validateInputEmail(value) {\n    var regexEmail = new RegExp(\"[^@]+@[^@]+\\\\.[^@]+\").test(value);\n    return value && regexEmail;\n  }\n\n  function validateInputPassword(value) {\n    var regexSixChars = new RegExp(/^[A-Za-z-0-9\\d$@$!%*#?&.]{6,}$/).test(value);\n    var regexCapital = new RegExp(/^(?=.*[A-Z])/).test(value);\n    var regexNumber = new RegExp(/^(?=.*\\d)/).test(value);\n    var countSteps = 0;\n    regexCapital ? countSteps++ : null;\n    regexNumber ? countSteps++ : null;\n    regexSixChars ? countSteps++ : null;\n\n    switch (countSteps) {\n      case 0:\n        removeAllClassesPasswordValidation(\"steps\");\n        break;\n\n      case 1:\n        removeAllClassesPasswordValidation(\"steps\");\n        passStrength.classList.add(\"error\");\n        break;\n\n      case 2:\n        removeAllClassesPasswordValidation(\"steps\");\n        passStrength.classList.add(\"warning\");\n        break;\n\n      case 3:\n        removeAllClassesPasswordValidation(\"steps\");\n        passStrength.classList.add(\"valid\");\n        break;\n    }\n\n    if (countSteps > 0) {\n      removeAllClassesPasswordValidation(null, \"requirements\");\n      regexSixChars ? passSpecifications[0].classList.add(\"valid\") : passSpecifications[0].classList.add(\"error\");\n      regexCapital ? passSpecifications[1].classList.add(\"valid\") : passSpecifications[1].classList.add(\"error\");\n      regexNumber ? passSpecifications[2].classList.add(\"valid\") : passSpecifications[2].classList.add(\"error\");\n    } else {\n      removeAllClassesPasswordValidation(null, \"requirements\");\n    }\n\n    return regexSixChars && regexCapital && regexNumber;\n  }\n\n  function removeAllClassesPasswordValidation() {\n    var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n    var requirements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n    if (steps) {\n      passStrength.classList.remove(\"warning\");\n      passStrength.classList.remove(\"error\");\n      passStrength.classList.remove(\"valid\");\n    }\n\n    if (requirements) {\n      for (var key in passSpecifications) {\n        passSpecifications[key].classList.remove(\"error\");\n        passSpecifications[key].classList.remove(\"valid\");\n      }\n    }\n  }\n\n  function validateInputPasswordConfirm(value) {\n    return value === intputPassword.value;\n  }\n\n  function validateSubmitButton() {\n    for (var key in formValidations) {\n      if (!formValidations[key]) {\n        btnSubmit.setAttribute(\"disabled\", \"disabled\");\n        return;\n      }\n    }\n\n    btnSubmit.removeAttribute(\"disabled\");\n  }\n\n  function sendUser(button) {\n    for (var key in formValidations) {\n      if (!formValidations[key]) return;\n    }\n\n    button.classList.add(\"sending\");\n    var body = {\n      name: intputName.value,\n      email: intputEmail.value,\n      password: intputPassword.value\n    };\n    _assets_js_api_js__WEBPACK_IMPORTED_MODULE_1___default.a.request(\"POST\", \"/user\", body, function (response) {\n      if (response) {\n        document.body.classList.add(\"form-sended\");\n      } else {\n        button.classList.remove(\"sending\");\n      }\n    });\n  }\n})();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/assets/css/main.scss":
/*!**********************************!*\
  !*** ./src/assets/css/main.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/assets/css/main.scss?");

/***/ }),

/***/ "./src/assets/js/api.js":
/*!******************************!*\
  !*** ./src/assets/js/api.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var baseURL = 'https://5b9701e429cbd70014a8fd28.mockapi.io/api';\nmodule.exports = {\n  request: function request(method) {\n    var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n    var callback = arguments.length > 3 ? arguments[3] : undefined;\n    var xhr = new XMLHttpRequest();\n    xhr.open(method, baseURL + endpoint, true);\n    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');\n\n    xhr.onload = function () {\n      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {\n        callback(xhr.responseText);\n      } else {\n        callback(false);\n      }\n    };\n\n    if (method === 'POST' && body) xhr.send(JSON.stringify(body));else xhr.send(null);\n  }\n};\n\n//# sourceURL=webpack:///./src/assets/js/api.js?");

/***/ })

/******/ });