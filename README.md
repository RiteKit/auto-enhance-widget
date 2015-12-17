# RiteTag Auto-Enhance Widget #



```
#!html

<script type="text/javascript" src="/dist/ritetag.widget.min.js"></script>

```


## Basic usage ##

1. Create a widget
2. Open modal
3. 

```
#!javascript

var widget = new RiteTag.Widget();
widget
    .open({ // open modal
        tweet: $("#text").val(),
        images: $(".image").map(function () {
                return $(this).attr("src")
            }).toArray(),
        autoenhance:$(this).data("autoenhance")
    })
    .done(function (data) {
        if (data.result == true) {
            $("#text").val(data.tweet);
            $(".thumnails").empty();
            for (var i = 0; i < data.images.length; i++) {
                $(".thumnails").append('<img class="image img-thumbnail" src="' + data.images[i] + '">');
            }
        }
    });

```

### function open(options) ###

Takes an object variable with option key:value properties and open modal.

* tweet - text of tweet/post
* images - array of image urls
* autoenhance (*0,1*) - start autoenhance 


### function done(callback(data)) ###

Takes a callback function. When modal is closed it provide data.

Data is an object variable with option key:value properties.

* result - 
* tweet - enhanced tweet/post
* images - an array of image urls