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
    "Гондор": "25, 25, 112", "Рохан": "0, 100, 0", "Арнор": "70, 130, 180", "Лотлориэн": "128, 128, 0", "Имладрис": "65, 105, 225", "Гномы": "184, 134, 11", "Изенгард": "0, 0, 0", "Мордор": "128, 0, 0", "Мглистые горы": "139, 69, 19", "Харад": "210, 105, 30", "Ангмар": "105, 105, 105", "Нейтральные": "47, 79, 79",
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
        $(".button-horde").addClass('display-none')
        $(".button-single").removeClass('display-none')
    } else {
        $(".button-horde").removeClass('display-none')
        $(".button-single").addClass('display-none')
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
                $(".list-objects ul").append(`
                    <li class='object'>
                        <figure style="border: 10px outset rgba(${factionColor[faction]})">
                            ${portrait(item.fields.img)}
                            ${descPortrait(item.fields.displayName, item.fields.name)}
                        </figure>
                        <div class='object-parameters display-none'>
                            <ol>
                                <li class='name'>${item.fields.name}</li>
                                <li class='kindOf'>${item.fields.kindOf}</li>
                                <li class='side'>${item.fields.side}</li>
                                <li class='displayName'>${item.fields.displayName}</li>
                                <li class='buildCost'>${item.fields.buildCost}</li>
                                <li class='img'>${item.fields.img}</li>
                            </ol>
                        </div>
                    </li>
                `);
            })
        },
        error: function () {
            console.log("error");
        },
    });
}

function viewObjectRender(displayName, side, buildCost, img){
    $(".view-object").empty()
    $(".view-object").append(`
        ${portrait(img)}
        <input class='form-content object-name input-blocked' type='text' placeholder='Имя' value='Имя: ${displayName}' disabled>
        <input class='form-content object-side input-blocked' type='text' placeholder='Фракция' value='Фракция: ${side}' disabled>
        <input class='form-content object-buildCost input-blocked' type='text' placeholder='Стоимость' value='Стоимость: ${buildCost}' disabled>
    `);
}

$(document).on('contextmenu', '.object figure', function(event){
  event.preventDefault();
  event.stopPropagation();
  $(".dropdown").remove()
  if ($('.form').attr('data-nav-module') == "Конфигурация карты") {
    $('.form').attr('data-context-menu', "True")
    $(this).append(`
      <div class='dropdown'>
        <ul>
            <li><?xml version="1.0" ?><svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m22 12a10 10 0 1 1 -20 0 10 10 0 1 1 20 0z" fill="#2980b9" transform="translate(0 1029.4)"/><path d="m22 12a10 10 0 1 1 -20 0 10 10 0 1 1 20 0z" fill="#3498db" transform="translate(0 1028.4)"/><path d="m11 1035.4v2h2v-2h-2zm-1 4-1 1h2v6h-2v1h1 4 1v-1h-2v-7h-3z" fill="#2980b9"/><path d="m11 6v2h2v-2h-2zm-1 4l-1 1h2v6h-2v1h1 4 1v-1h-2v-7h-3z" fill="#ecf0f1" transform="translate(0 1028.4)"/></g></svg>Информация</li>
        </ul>
      </div>
    `);
  }
});

$(document).on('click', '.list-objects', function(event){
  event.preventDefault();
  $(".dropdown").remove()
  $('.form').attr('data-context-menu', "False")
});


