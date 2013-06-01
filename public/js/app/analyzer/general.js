
define([
    'jquery'
], function($) {
    
    var GeneralAnalyzer = function() {
        this.init();
    };

    $.extend(GeneralAnalyzer.prototype, {
        init: function() {
            this.names = [];
            this.namesHash = {};
        },
        
        analyzeEntry: function(entry) {
            if (entry.type === 'twitter') {
                this.analyzeTwitterData(entry.data);
            }
        },
        
        analyzeTwitterData: function(data) {
            if (data.user) {
                var name = data.user.name;
                if (name && !this.namesHash[name]) {
                    this.namesHash[name] = true;
                    this.names.push(name);
                }
            }
        },
        
        getNames: function() {
            return this.names;
        }
    });
    
    return GeneralAnalyzer;
    
});
