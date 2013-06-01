
define([
    'jquery'
], function($) {
    
    var init = function() {
        $('.js-search-profile').click(function() {
            $.get('/search').done(function(res) {
                console.log("Result: " + res);
            });
        });
    };
    
    $(document).ready(init);
    
    return {};
    
});
