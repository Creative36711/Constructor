function customCheckbox(parent, id, text){
    var div1 = $('<div>', {'class': 'customCheckBoxHolder'})
    var input = $('<input>', {'class': 'customCheckBoxInput', 'id': id, 'type': 'checkbox'})
    var label = $('<label>', {'class': 'customCheckBoxWrapper', 'for': id})
    var div2 = $('<div>', {'class': 'customCheckBox'})
    var div3 = $('<div>', {'class': 'inner'})
    parent.append(div1)
    div1.append(input)
    div1.append(label)
    label.append(div2)
    div2.append(div3)
    div3.text(text)
}

function conditionsInput(selector, text, type, textEnd){
    $(document).on('click', selector, function() {
        $(this).val('')
    });
    $(document).on('change', selector, function() {
        if (textEnd == undefined) {
            $(this).val(text + ": " + $(this).val())
        } else {
            $(this).val(text + ": " + $(this).val() + " " + textEnd)
        }
    });
    $(document).on('input', selector, function() {
        if (type == "int") {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        } else if (type == "float") {
            if (this.value.match(/[^0-9.,]/g)) {
                this.value = this.value.replace(/[^0-9.]/g, '');
            }
            if (this.value.match(/[,]/g)) {
                this.value = this.value.replace(/[,]/g, '.');
            }
        }
    });
}

function deletingFields(selector, value, text) {
    $(document).on('click', selector, function() {
        $(this).closest('.container').remove()
        var count = Number($(value).val().split(':')[1]) - 1
        $(value).val(text + ": " + count)
    });
}

function cross(count, selector) {
    return (count > 1) ? `<div class='cross ${selector}'><span>❌</span></div>` : ``
}

function buttonLock(inputs, buttons, event, selector) {
    $(document).on(event, selector, function() {
        if (event == 'input') {
            if ($(selector).val().length == 0 || $(this).val().length == 1) execution()
        } else {
            execution()
        }
        function execution() {
            var blocking = false
            $.each(inputs,function(index,value){
                $(value).each(function() {
                    if($(this).val() == "") blocking = true
                });
            });
            if (blocking == true) {
                $.each(buttons,function(index,value){
                    $(value).addClass('input-blocked')
                    $(value).attr("disabled", "disabled")
                });
            } else {
                $.each(buttons,function(index,value){
                    $(value).removeClass('input-blocked')
                    $(value).removeAttr("disabled")
                });
            }
        }
    });
}

function portrait(img){
    if (img != "objects/portrait/Отсутствует") {
        return `<img src='../media/${img}' onerror="this.src='/static/builder/img/image-error.jpg';">`
    } else {
        return `<img src='/static/builder/img/no-image.png'>`
    }
}

function descPortrait(displayName, name){
    if (displayName != "Отсутствует") {
        return `<figcaption style='background-color: rgba(${factionColor[faction]}); box-shadow: rgba(${factionColor[faction]}, 0.4) -5px 5px, rgba(${factionColor[faction]}, 0.3) -10px 10px, rgba(${factionColor[faction]}, 0.2) -15px 15px, rgba(${factionColor[faction]}, 0.1) -20px 20px, rgba(${factionColor[faction]}, 0.05) -25px 25px'>${displayName}</figcaption>`
    } else {
        return `<figcaption style='background-color: rgba(${factionColor[faction]}); box-shadow: rgba(${factionColor[faction]}, 0.4) -5px 5px, rgba(${factionColor[faction]}, 0.3) -10px 10px, rgba(${factionColor[faction]}, 0.2) -15px 15px, rgba(${factionColor[faction]}, 0.1) -20px 20px, rgba(${factionColor[faction]}, 0.05) -25px 25px'>${name}</figcaption>`
    }
}

function additionalButton(className, text){ return `

<button class="${className}" type="button">${text}</button>

`}