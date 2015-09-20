function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) {yy = '0' + yy;}

    return dd + '.' + mm + '.' + yy;
}


function stringToDate(_date) {
    var delimeters = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?', '\\.']; //escaped delimeters
    //console.log(delimeters.join('|')); // result regexp
    var dateItems = _date.split(new RegExp(delimeters.join('|'), 'g'));
    if ((dateItems.length == 2)||(dateItems.length == 3)){
        var day = dateItems[0];
        var month = dateItems[1];
    	if (dateItems.length == 2){
            if((day.length == 0) && (month.length == 0)){
                var new_date = new Date();
				month = new_date.getMonth() + 1;
                day = new_date.getDate();
            }
            var year = new Date();
            year = year.getFullYear();
        }
        else if(dateItems.length == 3){
            var year = dateItems[2];
            if ((year.length == 1)|| (year.length == 2)){
               var tmp_date = new Date(parseInt(year)+1900, month-1, day);
               if (tmp_date.getFullYear() < 1970) {
                    tmp_date.setFullYear(tmp_date.getFullYear() + 100);
                }
                year = tmp_date.getFullYear();
            }
            else if(year.length == 0){
                var year = new Date();
            	year = year.getFullYear();
            }
        }
        var formatedDate = new Date(year, month-1, day);
    }
    else{
    	console.error("Wrong date input formate");
    }
   return formatedDate;
}

document.getElementById("demo").innerHTML += "</br>" + stringToDate("3-12-") + "</br>" + stringToDate("5.10.00.78") + "</br>" + stringToDate("5/10/") + "</br>" + stringToDate("1/1")+ "</br>" + stringToDate("1.1.")+ "</br>" + stringToDate("/")
