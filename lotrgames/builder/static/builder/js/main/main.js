$('.card__head').each(function (index, element) {
    var parent = element.closest('.card')
    if ($.trim($(parent).text()) != "Tower Defence") {
        $(parent).addClass('mode-unavailable')
        $(element).addClass('element-blocked')
    } else {
        $(parent).addClass('mode-available')
    }
});

$(".card").click(function(){
    if ($(this).hasClass('card-active')){
         if ($(this).hasClass('mode-available')){
            $('#game-mode').val($(".card__head", this).text())
            $('.form').attr('data-nav-module', "Конструктор карт")
            navigation(".container-modes", ".container-main", "Конструктор карт")
            mapTemplateRender()
        }
    } else {
        $(".card").removeClass('card-active')
        $(".card__head").removeClass('card__head-active')
        $(this).addClass('card-active')
        $(".card__head", this).addClass('card__head-active')
    }
})

function mapTemplateRender(){
    $.ajax({
        type: "GET",
        url: "/builder/mapTemplates",
        success: function (data) {
        $('.container-design ul').remove();
        var ul = $('<ul>')
        $('.container-design').append(ul)
        var modes
            data.forEach(function(item) {
                modes = item.fields.modes.split(';');
                if ($.inArray($('#game-mode').attr('value'), modes) >= 0) {
                    var li = $('<li>', {'class': 'card-map'})
                    var a = $('<a>', {'href': '#'})
                    var figure = $('<figure>')
                    var img = $('<img>', {'src': '../media/' + item.fields.img})
                    var figcaption = $('<figcaption>').html(item.fields.title + '<br/><br/>Количество игроков: 1-'
                    + item.fields.players + '<br/>Автор: ' + item.fields.author);

                    ul.append(li)
                    li.append(a)
                    a.append(figure)
                    figure.append(img)
                    figure.append(figcaption)
                }
            });
        },
        error: function () {
            console.log("error");
        },
    });
}

$(document).on('click', '.card-map', function() {
    $('#map-design').val($("figcaption", this).html().split('<br')[0])
    $('.form').attr('data-nav-module', "Конструктор карт")
    navigation(".container-design", ".container-main", "Конструктор карт")
});