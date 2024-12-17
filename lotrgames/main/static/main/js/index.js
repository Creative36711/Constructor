var urlPost =  new RegExp("/news/.","i");
var urlMap =  new RegExp("/maps/.","i");

var url = $(location).attr('href')
var slug = url.split("/")[4]
var views = Number($(".views").text()) + 1
var downloads = Number($(".downloads").text()) + 1

function getCookiePost(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getCookieCsrf(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function ajax(url, post, action){
    if (getCookiePost(slug+action) == undefined) {
        document.cookie = slug+action+"=on;max-age=86400"
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: JSON.stringify({"post": post}),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookieCsrf("csrftoken"),
            },
            success: function (data) {
//                console.log(data)
            },
            error: function () {
                console.log("error");
            },
        });
    }
}

if (urlPost.test(url)) {
    ajax("/ajaxNews", [slug, "views", views], "views")
} else if(urlMap.test(url)) {
    ajax("/ajaxMaps", [slug, "views", views], "views")
}

$(document).on('click', '.download-map', function() {
    ajax("/ajaxMaps", [slug, "downloads", downloads], "downloads")
});

function authorization() {
    $('.humberger-menu-overlay').trigger('click')
    $('.signup-open').trigger('click')
}

var options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timezone: 'UTC'
};

$('.ht-widget time').text(new Date().toLocaleString("ru", options))



console.log(date)