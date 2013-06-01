
define([
    'jquery',
    'app/analyzer/general',
    'app/templates'
], function($, GeneralAnalyzer, templates) {
    
    var analyzer;
    
    var init = function() {
        $('.js-search-profile').click(function() {
            var twitter = $('#twitter-username');
            if (!twitter.val()) {
                return;
            }
            
            var $this = $(this);
            var prevText = $this.html();
            $this.prop('disabled', true)
                .html('Searching...');
            
            $.get('/search', {
                twitter: twitter.val()
            }).done(function(res) {
                analyzer = new GeneralAnalyzer();
                addEntries($('#tab-bad-content'), res.bad);
                addEntries($('#tab-good-content'), res.good);
                addGeneralInfo();
            }).always(function() {
                $this.prop('disabled', false)
                    .html(prevText);
            });
        });
    };
    
    var addEntries = function($tab, entries) {
        $tab.html('');
        var length = entries.length;
        $('.nav-tabs a[href="#' + $tab.attr('id') + '"] .count').html(length);
        for (var i=0; i<length; i++) {
            var entry = entries[i];
            $tab.append(templates.entry(entry));
            analyzer.analyzeEntry(entry);
        }
    };

    var addGeneralInfo = function() {
        var $general = $('#tab-general-content');
        $general.html('');
        var names = analyzer.getNames();
        if (names.length) {
            var $nameElement = $('<div class="entry entry-type-general"><label>Names:</label></div>');
            $general.append($nameElement);
            for (var i=0; i<names.length; i++) {
                $nameElement.append('<span>' + names[i] + '</span>');
            }
        }
    };
    
    $(document).ready(init);
    
    return {};
    
});
