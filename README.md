# jQuery Fullscreen Plugin

Wrap around HTML5 Fullscreen API.

## Usage

    // works 
    $(el).click(function() {
        $(this).fullscreen();
    });
    
    // direct calls doesn't work
    $(el).fullscreen();
    
    // special events
    fullscreenenter // triggered when current element enters fs mode
    fullscreenexit // when current element exits fs mode
    fullscreenchange // when fs is toggled
    fullscreenerror // when fs encounters errors
    
    $(el).on('fullscreenenter', function(ev) { });

## Dependencies 

jQuery 1.4+

## Note

This plugin doesn't work in IE.
