
define([
    'mustache',
    'text!templates/entry.hjs'
], function(Mustache, entryTemplate) {
    
    return {
        
        entry: Mustache.compile(entryTemplate)
        
    };
    
});