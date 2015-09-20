/**
 * Created by ETokareva on 04.08.2015.
 */
function compareDec(input_number) {
    return (input_number < 10) ? "0" + input_number : input_number;
}

function tmpl(txt) {
    return new Function("obj", "var p=[];(function(){p.push('" +
    txt.replace(/[\r\t]/g, " ")
        .replace(/[\n]/g, "\\n")
        //Allows @varname as a shortcut for <%=this.varname%>
        .replace(/@([\w]+)/g, "<%=this.$1%>")
        .split("<%").join("\t")
        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        // escape other single quotes
        .split("'").join("\\'")
        .replace(/\t=(.*?)%>/g, "',$1,'")
        .split("\t").join("');")
        .split("%>").join("p.push('")
        .split("\r").join("\\'")
    + "');}).call(obj); return p.join('');");
}
// Показываем процент загрузки
function uploadProgress(event) {
    var percent = parseInt(event.loaded / event.total * 100);
}

// Пост обрабочик
function stateChange(event) {
    if (event.target.readyState === 4) {
        console.log(event.responseText);
        if (event.target.status === 200) {
        } else {
            dropZone.text('Error!');
            dropZone.addClass('error');
        }
    }
}


if ($('#dropZone').length) {
    var dropZone = $('#dropZone'), maxFileSize = 1000000;

// Проверка поддержки браузером
    if (typeof(window.FileReader) == 'undefined') {
        dropZone.text('Doesn\'t supported by browser!');
        dropZone.addClass('error');
    }

// Добавляем класс hover при наведении
    dropZone[0].ondragover = function () {
        dropZone.addClass('hover');
        return false;
    };

// Убираем класс hover
    dropZone[0].ondragleave = function () {
        dropZone.removeClass('hover');
        return false;
    };

// Обрабатываем событие Drop
    dropZone[0].ondrop = function (event) {
        event.preventDefault();
        dropZone.removeClass('hover');
        dropZone.delay(500).addClass('drop', 1500).removeClass('drop', 2500);
        var today = new Date();
        var theMonth = today.getMonth() + 1;
        var theDate = today.getDate();
        var theYear = today.getFullYear();
        var theHours = today.getHours();
        var theMinutes = today.getMinutes();

        var creationDate = compareDec(theDate) + "." + compareDec(theMonth) + "." + compareDec(theYear) + " , " + compareDec(theHours) + ":" + compareDec(theMinutes);
        var file = event.dataTransfer.files[0];

        // Проверяем размер файла
        /*if (file.size > maxFileSize) {
         dropZone.text('File is too large!');
         dropZone.addClass('error');
         return false;
         }*/

        // Создаем запрос
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', uploadProgress, false);
        xhr.onreadystatechange = stateChange;
        xhr.open('POST', '/index.cfm?way=1703541');
        xhr.setRequestHeader('X-FILE-NAME', file.name);
        xhr.send(file);

        //Формируем template data
        var compiled_template = tmpl($('#tmpl1').text());
        $('.doc__uploaded').last().after(
            compiled_template({
                title: file.name,
                time: creationDate
            }))
            .next(".doc__uploaded")
            .find(".bar-line")
            .addClass("barAnimation")
            .delay(5000)
            .hide(0)
            .closest(".doc__uploaded")
            .find(".doc_remove")
            .off("click")
            .on("click", function () {
                $(this).closest("section.doc__uploaded").hide();
            });

    };
}
