# IMPORTANT: This code is deprecated. 
The repo will be updated in the future

# RiteTag Auto-Enhance Widget #

## UX Example ##

a) User clicks RiteTag Auto-enhance button next to Send button in your composer 

![image00.png](https://bitbucket.org/repo/q6E6Ep/images/453636314-image00.png)

b) RiteTag composer (iframe) loads data from original composer

![image01.png](https://bitbucket.org/repo/q6E6Ep/images/2751996350-image01.png)

c) After user hits Save, changes are loaded back to original composer 

![image03.png](https://bitbucket.org/repo/q6E6Ep/images/3886801113-image03.png)

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
