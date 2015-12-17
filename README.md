# RiteTag Auto-Enhance Widget #

## Basic Usage ##

### 1) Include the JS file in your page ###

```
#!html

<script type="text/javascript" src="/dist/ritetag.widget.min.js"></script>

```


###2) Adjust code for loading data to and from RiteTag Widget ###

Code example (no jQuery required by RiteTag widget itself, should run on page load):
```
#!javascript

var widget = new RiteTag.Widget();
widget
    .open({ // Pass current text and images to RiteTag Widget
        tweet: $("#text").val(),
        images: $(".image").map(function () {
                return $(this).attr("src")
            }).toArray(),
        autoenhance:$(this).data("autoenhance")
    })
    .done(function (data) { // load text and images from RiteTag Widget to your composer
        if (data.result == true) {
            $("#text").val(data.tweet);
            $(".thumnails").empty();
            for (var i = 0; i < data.images.length; i++) {
                $(".thumnails").append('<img class="image img-thumbnail" src="' + data.images[i] + '">');
            }
        }
    });

```

##Documentation##

### function open(options) ###

Takes an object variable with key:value properties and opens RiteTag Widget modal.

* **tweet** - text of tweet/post
* **images** - array of image urls
* **autoenhance** (*0,1*) - start Auto-Enhance immediately


### function done(callback(data)) ###

Takes a callback function that is called when the RiteTag Widget modal closes.

Data is an object variable with key:value properties.

* **result** - true when user hits Save (wants to load the data back to original composer), false when user just closes the modal (doesn't wants to load the data back to original composer)
* **tweet** - text of enhanced tweet/post
* **images** - an array of image urls