

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

requirejs.config({
    urlArgs: 'v=' + new Date().getTime(),
    baseUrl: 'js/lib',
    paths: {
        'app': '../app',
        'templates': '/partials'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'window.jQuery.fn.affix'
        },
        'jquery.isotope': {
            deps: ['jquery'],
            exports: 'window.jQuery.fn.isotope'
        }
    }
});

requirejs.onError = console && (console.error || console.log);

require([
    'jquery',
    'bootstrap',
    'jquery.timeago',
    'jquery.isotope',
    'app/plugins'
], function($) {
    
});