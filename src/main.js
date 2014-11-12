/* globals require*/
var TypeDescriptor = require('./TypeDescriptor'),
    simpleDescriptor = new TypeDescriptor();

simpleDescriptor.setType('System.IO.Path');
simpleDescriptor.setDescription('Some description');

console.log('I defined a simple descriptor', simpleDescriptor);