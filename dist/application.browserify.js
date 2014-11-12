(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/main.js":[function(require,module,exports){
/* globals require*/
var TypeDescriptor = require('./TypeDescriptor'),
    simpleDescriptor = new TypeDescriptor();

simpleDescriptor.setType('System.IO.Path');
simpleDescriptor.setDescription('Some description');

console.log('I defined a simple descriptor', simpleDescriptor);
},{"./TypeDescriptor":"d:\\work\\build_with_gulp\\src\\TypeDescriptor.js"}],"d:\\work\\build_with_gulp\\src\\TypeDescriptor.js":[function(require,module,exports){
'use strict';

function TypeDescriptor() {
}

TypeDescriptor.prototype = {
    constructor: TypeDescriptor,
    
    setType: function (type){
        this.type = type;
    },
    
    setDescription: function (description) {
        this.description = description;
    }
};

module.exports = TypeDescriptor;
},{}]},{},["./src/main.js"])
//# sourceMappingURL=application.browserify.js.map
