conditionsInput('.map-version', "Версия карты", "float")
conditionsInput('.map-name', "Название карты", "str")

$(document).on('change', '.map-name', function(e) {
    $('#map-display').val($(this).val())
});

$(document).on('change', '.user-map-image', function(e) {
    $(".user-map-image-name").text("Название файла: " + e.target.files[0].name)
});

$(document).on('change', '.map-version', function() {
    var version = Number($(this).val().split(":")[1].trim().slice(0,3))
    if (version >= 1) {
//        do nothing
    } else if (version >= 0.9 && version < 1) {
        $(this).val($(this).val() + " (Release candidate)")
    } else if (version >= 0.6 && version < 0.9) {
        $(this).val($(this).val() + " (Beta)")
    } else if (version >= 0.3 && version < 0.6) {
        $(this).val($(this).val() + " (Alpha)")
    } else if (version >= 0.1 && version < 0.3) {
        $(this).val($(this).val() + " (Pre-Alpha)")
    } else if (version < 0.1) {
        $(this).val($(this).val() + " (Development)")
    }
});

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
            $('#game-mode').val("Режим игры: " + $(".card__head", this).text())
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
                if ($.inArray($('#game-mode').attr('value').split(":")[1].trim(), modes) >= 0) {
                    ul.append(`
                        <li class="card-map">
                            <a href="#">
                                <figure>
                                    <img src="../media/${item.fields.img}"><figcaption>${item.fields.title}<br/><br/>Количество игроков: 1-${item.fields.players}<br/>Автор: ${item.fields.author}</figcaption>
                                </figure>
                            </a>
                        </li>
                    `)
                }
            });
        },
        error: function () {
            console.log("error");
        },
    });
}

$(document).on('click', '.card-map', function() {
    $('#map-design').val("Шаблон карты: " + $("figcaption", this).html().split('<br')[0])
    $('.form').attr('data-nav-module', "Конструктор карт")
    navigation(".container-design", ".container-main", "Конструктор карт")
});

$(document).on('click', '#map-save', function() {
    var module = $('.form').attr('data-nav-module')

    if (module == "Отображение") {
        $('.close-modal').trigger('click')
    }
});