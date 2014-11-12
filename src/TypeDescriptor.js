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