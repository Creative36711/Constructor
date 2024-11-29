var categoryUnits = {
    "Swordsman": ["INFANTRY"],
    "Pike": ["PIKE"],
    "Archer": ["ARCHER", "GONDOR_RANGER_KINDOF, ANGMAR_RANGER_KINDOF, ARNOR_RANGER_KINDOF"],
    "Cavalry": ["CAVALRY"],
    "Hero": ["HERO", "HOBBIT_KINDOF"],
    "Monster": ["MONSTER"],
    "Siegeengine": ["SIEGEENGINE"],
    "Swordsman-horde": ["INFANTRY"],
    "Pike-horde": ["PIKE"],
    "Archer-horde": ["ARCHER", "GONDOR_RANGER_KINDOF, ANGMAR_RANGER_KINDOF, ARNOR_RANGER_KINDOF"],
    "Cavalry-horde": ["CAVALRY"],
    "All": ["ALL"],
}

var subtractSwordsman = ["PIKE", "ARCHER", "HERO", "DOZER", "HORDE"]
var subtractSwordsmanHorde = ["PIKE", "ARCHER", "HERO", "DOZER"]
var subtractSingleUnits = ["HORDE"]

factionColor = {
    "Гондор": "25, 25, 112", "Рохан": "0, 100, 0", "Арнор": "70, 130, 180", "Лотлориен": "128, 128, 0", "Имладрис": "65, 105, 225", "Гномы": "184, 134, 11", "Изенгард": "0, 0, 0", "Мордор": "128, 0, 0", "Мглистые горы": "139, 69, 19", "Харад": "210, 105, 30", "Ангмар": "105, 105, 105", "Нейтральные": "47, 79, 79",
}

function objectFilter(arr, type, catType){
    for (i = 0; i < arr.length; i++) {
        allArr = $(arr[i]).text().split(" ")
        if (type != "Swordsman" && type != "All" && type.indexOf('horde') == -1) {
            matchCheck_1 = subtractSingleUnits.some(el => allArr.includes(el))
            if (matchCheck_1) {
                $(arr[i]).closest(".object").hide()
            } else {
                matchCheck_2 = catType.some(el => allArr.includes(el))
                if (matchCheck_2) {
                    $(arr[i]).closest(".object").show()
                } else {
                    $(arr[i]).closest(".object").hide()
                }
            }
        } else if (type == "Swordsman" && type.indexOf('horde') == -1) {
            matchCheck_1 = subtractSwordsman.some(el => allArr.includes(el))
            if (matchCheck_1) {
                $(arr[i]).closest(".object").hide()
            } else {
                matchCheck_2 = catType.some(el => allArr.includes(el))
                if (matchCheck_2) {
                    $(arr[i]).closest(".object").show()
                } else {
                    $(arr[i]).closest(".object").hide()
                }
            }
        } else if (type != "Swordsman-horde" && type != "All" && type.indexOf('horde') > -1) {
            matchCheck_1 = subtractSingleUnits.some(el => allArr.includes(el))
            if (matchCheck_1) {
                $(arr[i]).closest(".object").show()
                matchCheck_2 = catType.some(el => allArr.includes(el))
                if (matchCheck_2) {
                    $(arr[i]).closest(".object").show()
                } else {
                    $(arr[i]).closest(".object").hide()
                }
            } else {
                $(arr[i]).closest(".object").hide()
            }
        } else if (type == "Swordsman-horde" && type.indexOf('horde') > -1) {
            matchCheck_1 = subtractSingleUnits.some(el => allArr.includes(el))
            if (matchCheck_1) {
                $(arr[i]).closest(".object").show()
                matchCheck_2 = subtractSwordsmanHorde.some(el => allArr.includes(el))
                if (matchCheck_2) {
                    $(arr[i]).closest(".object").hide()
                } else {
                    $(arr[i]).closest(".object").show()
                    matchCheck_3 = catType.some(el => allArr.includes(el))
                    if (matchCheck_3) {
                        $(arr[i]).closest(".object").show()
                    } else {
                        $(arr[i]).closest(".object").hide()
                    }
                }
            } else {
                $(arr[i]).closest(".object").hide()
            }
        } else if (type == "All") {
            $(arr[i]).closest(".object").show()
        }
    }
}

$(".radio-item input[name='objectType']").change(function(){
    var value = $('input[name="objectType"]:checked');
    if (value.attr('id') == "SingleUnits") {
        $(".swordsman-horde").addClass('display-none')
        $(".pike-horde").addClass('display-none')
        $(".archer-horde").addClass('display-none')
        $(".cavalry-horde").addClass('display-none')
        $(".swordsman").removeClass('display-none')
        $(".pike").removeClass('display-none')
        $(".archer").removeClass('display-none')
        $(".cavalry").removeClass('display-none')
        $(".hero").removeClass('display-none')
        $(".monster").removeClass('display-none')
        $(".siegeengine").removeClass('display-none')
        $(".hero").removeClass('display-none')
    } else {
        $(".swordsman-horde").removeClass('display-none')
        $(".pike-horde").removeClass('display-none')
        $(".archer-horde").removeClass('display-none')
        $(".cavalry-horde").removeClass('display-none')
        $(".swordsman").addClass('display-none')
        $(".pike").addClass('display-none')
        $(".archer").addClass('display-none')
        $(".cavalry").addClass('display-none')
        $(".hero").addClass('display-none')
        $(".monster").addClass('display-none')
        $(".siegeengine").addClass('display-none')
        $(".hero").addClass('display-none')
}
})

function gameObjectsRender(faction){
    $.ajax({
        type: "GET",
        url: "/builder/gameObjects",
        dataType: "json",
        data: {faction: faction},
        success: function (data) {
            $(".list-objects ul").empty()
            data.forEach(function(item) {
                var li = $('<li>', {'class': 'object'})
                var figure = $('<figure>').css({'border': '10px outset rgba(' + factionColor[faction] + ')'})
                var div = $('<div>', {'class': 'object-parameters display-none'})
                var ol = $('<ol>')
                var li_p_1 = $('<li>', {'class': 'name'}).text(item.fields.name)
                var li_p_2 = $('<li>', {'class': 'kindOf'}).text(item.fields.kindOf)
                var li_p_3 = $('<li>', {'class': 'side'}).text(item.fields.side)
                var li_p_4 = $('<li>', {'class': 'displayName'}).text(item.fields.displayName)
                var li_p_5 = $('<li>', {'class': 'buildCost'}).text(item.fields.buildCost)
                var li_p_6 = $('<li>', {'class': 'img'}).text(item.fields.img)
                if (item.fields.img != "objects/portrait/Отсутствует") {
                    var img = $('<img>', {'src': '../media/' + item.fields.img, 'onError': "this.src='/static/builder/img/image-error.jpg'"})
                } else {
                    var img = $('<img>', {'src': '/static/builder/img/no-image.png'})
                }
                if (item.fields.displayName != "Отсутствует") {
                    var figcaption = $('<figcaption>').text(item.fields.displayName).css({'background-color': 'rgba(' + factionColor[faction] + ')', 'box-shadow': 'rgba(' + factionColor[faction] + ', 0.4) -5px 5px, rgba(' + factionColor[faction] + ', 0.3) -10px 10px, rgba(' + factionColor[faction] + ', 0.2) -15px 15px, rgba(' + factionColor[faction] + ', 0.1) -20px 20px, rgba(' + factionColor[faction] + ', 0.05) -25px 25px'})
                } else {
                    var figcaption = $('<figcaption>').text(item.fields.name).css({'background-color': 'rgba(' + factionColor[faction] + ')', 'box-shadow': 'rgba(' + factionColor[faction] + ', 0.4) -5px 5px, rgba(' + factionColor[faction] + ', 0.3) -10px 10px, rgba(' + factionColor[faction] + ', 0.2) -15px 15px, rgba(' + factionColor[faction] + ', 0.1) -20px 20px, rgba(' + factionColor[faction] + ', 0.05) -25px 25px'})
                }

                $(".list-objects ul").append(li)
                li.append(figure)
                li.append(div)
                div.append(ol)
                ol.append(li_p_1)
                ol.append(li_p_2)
                ol.append(li_p_3)
                ol.append(li_p_4)
                ol.append(li_p_5)
                ol.append(li_p_6)
                figure.append(img)
                figure.append(figcaption)
            })
        },
        error: function () {
            console.log("error");
        },
    });
}

function viewObjectRender(displayName, side, buildCost, img){
    $(".view-object").empty()
    var input_name = $('<input>', {'class': 'form-content object-name input-blocked', 'type': 'text', 'placeholder': 'Имя', 'disabled': 'disabled'})
    var input_side = $('<input>', {'class': 'form-content object-side input-blocked', 'type': 'text', 'placeholder': 'Фракция', 'disabled': 'disabled'})
    var input_buildCost = $('<input>', {'class': 'form-content object-buildCost input-blocked', 'type': 'text', 'placeholder': 'Стоимость', 'disabled': 'disabled'})

    if (img != "objects/portrait/Отсутствует") {
        var img = $('<img>', {'src': '../media/' + img, 'onError': "this.src='/static/builder/img/image-error.jpg'"})
    } else {
        var img = $('<img>', {'src': '/static/builder/img/no-image.png'})
    }

    $(".view-object").append(img)
    $(".view-object").append(input_name.val("Имя: " + displayName))
    $(".view-object").append(input_side.val("Фракция: " + side))
    $(".view-object").append(input_buildCost.val("Стоимость: " + buildCost))
}