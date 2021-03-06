//----------------JSON------------------------------------------
function loadJSON(callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', 'JSON/test.json', true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == "200")
        {
            callback(request.responseText);
        }
    }
request.send(null);
}

loadJSON(function(response) {
	var result = JSON.parse(response);

	for (var obj in result) {

	    var div_product = document.createElement('div');
		div_product.innerHTML = "<div class=\"col-lg-4 col-md-4 col-sm-6 col-xs-12 testing\"><div class=\"js_styles\"><a href=\"#\" id=\"product_name\">MSI PCI-Ex GeForce GTX 960</a><div class=\"catalog_img\"><img class=\"product_photo\" id=\"product_img\" src=\"img/main/products/oven.png\" alt=\"Some product\" title=\"Some product\" width=\"100%\"></div><h3 id=\"product_description\" title=\"Description\">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR DOLER ADIPISCING ELIT.</h3><div class=\"price\"><h2 id=\"product_price\" title=\"price\">$ 350.95</h2><form method=\"POST\" action=\"адрес\"><input type=\"hidden\" value=\"###\" name=\"catalog_item_id\"><span><button style=\"background-color: transparent; border: 0px;\" type=\"submit\" name=\"topurchasesfromcatalog\"><img src=\"img/main/cart.png\" alt=\"Добавить в корзину\" title=\"Add to basket\"></button></span></form></div></div>";
		var catalog = document.getElementById('catalog');
		var first = catalog.childNodes[0];
		catalog.insertBefore(div_product,first);

		document.getElementById('product_name').innerHTML = result[obj]["productName"];
		document.getElementById('product_price').innerHTML = result[obj]["ProductCost"];
		document.getElementById('product_img').setAttribute('src', result[obj]["productPicture"]);
		document.getElementById('product_img').setAttribute('alt', result[obj]["productName"]);
		document.getElementById('product_description').innerHTML = result[obj]["productShirtDescription"];

		for (var prop in result[obj]) {

		  	function f1(id, id_name, name) {
		  		var ul_product = document.createElement('li');
			  	ul_product.innerHTML = "<a id=\"this_product\" href=\"#\">Porshe</a>";
			  	var id = document.getElementById(id);
			  	var one = id.childNodes[0];
				id.insertBefore(ul_product,one);
				document.getElementById('this_product').setAttribute('id', id_name);
				document.getElementById(id_name).innerHTML = name;
		  	}

			var id_name = result[obj]["productId"];

	  		if(result[obj][prop]=='Ноутбук') {
	  			f1("laptop", id_name, result[obj]["productName"]);
	  		}
	  		if(result[obj][prop]=='Смартфон') {
	  			f1("iphone", id_name, result[obj]["productName"]);
	  		}
	  		if(result[obj][prop]=='mp4') {
	  			f1("ipod", id_name, result[obj]["productName"]);
	  		}
	  		if(result[obj][prop]=='планшет') {
	  			f1("ipad", id_name, result[obj]["productName"]);
	  		}
		}
	}
});

function open_feedback() {  //ищу высоту страницы на текущий момент
	var scrollHeight = Math.max(
	document.body.scrollHeight, document.documentElement.scrollHeight,
	document.body.offsetHeight, document.documentElement.offsetHeight,
	document.body.clientHeight, document.documentElement.clientHeight );
	document.getElementById('b-popup').style.height = scrollHeight + "px";
	document.getElementById('b-popup').style.display = 'block';  // открываем фоорму с fade-эффектом
}  // 
function close_feedback() {
	document.getElementById('b-popup').style.display = 'none';  // закрываю форму
}

//-------------------------------------Поиск по странице-----------------------------------------------------

var input,search,pr,result,result_arr, locale_HTML = new Array();

window.onload = function(){  //ждем подгрузки Jsona и выполняем
	for(var i=0;i<document.getElementsByClassName('place_for_live_search').length;i++)
	{
		locale_HTML[i]=document.getElementsByClassName('place_for_live_search')[i].innerHTML;
	}
}

function FindOnPage(name, status) {
	var res_of_search = false;
	for(var j=0;j<locale_HTML.length;j++)   //цикл проходит по всем объектам, с указанными классами. Т.е. чтоб добавить блок из DOM в список на поиск надо добавить ему класс 
	{

			input = document.getElementById(name).value; //получаем значение из поля в html
			input = input.replace(/^\s+/g,'');           //убираем первые пробелы
			input = input.replace(/[ ]{1,}/g,' ');        //Заменяем много пробелом на 1

			if(input.length<3&&status == true)
			{	
				for(var k=0;k<locale_HTML.length;k++)
				{
					document.getElementsByClassName('place_for_live_search')[k].innerHTML = locale_HTML[k];
				}
				return;
			}
			
			if(input.length>=3)
			{
				function FindOnPageGo(j) {

					search = '/'+input+'/g';  //делаем из строки регуярное выражение
					pr = document.getElementsByClassName('place_for_live_search')[j].innerHTML;   // сохраняем в переменную весь body
					result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
					result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)
					
					var warning = true;
					for(var i = 0 ; i<result.length ; i++) {
						if(result[i].match(eval(search)) != null) {
							warning = false;
						}
					}
					if(warning == false) {
						res_of_search = true;
					}

					for(var i=0 ; i<result.length ; i++) {
						result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
					}
					for(var i=0 ; i<result.length ; i++) {
						pr=pr.replace(result[i],result_arr[i])  //заменяем в переменной с html текст на новый из новогом ассива
					}
					document.getElementsByClassName('place_for_live_search')[j].innerHTML = pr;  //заменяем html код
				}
			}
			function FindOnPageBack() {
			 	document.getElementsByClassName('place_for_live_search')[j].innerHTML = locale_HTML[j]; 
			}
			if(status) { FindOnPageBack(); FindOnPageGo(j); } //чистим прошлое и Выделяем найденное
			if(!status) { document.getElementById('text-to-find').value = ''; FindOnPageBack(); return; } //Снимаем выделение
	}
	if(!res_of_search) {
		alert('Совпадений не найдено');
	}
}

var change = document.getElementById('text-to-find').value;  //Если значение поля изменилось - выполяем функцию поиска
setInterval(function(){
	var newchange = document.getElementById('text-to-find').value;
	if(newchange == change) {
		return;
	}
	if(newchange != change) {
		FindOnPage('text-to-find', true)
		change = newchange;
	}
}, 1000);

//----------------SLIDER----------------
var link_value = 'img/header/slider/';  //храню путь к папке
var images = ['1.png','2.png','3.png'];  //храню названия фоток в слайдер
var slider_img = document.getElementById('slider_image').src;
var counter = 0; //счетчик фотографий

function PrevPicture() {  //Ручной слайдер влево
	counter--;
	if(counter == -1) {counter = images.length-1;}
	document.getElementById('slider_image').setAttribute('src', link_value+images[counter]);
	document.getElementById('slider_image').style.opacity = 1;
}
function NextPicture() {  //Ручной слайдер Вправо
	counter++;
	if(counter == images.length) {counter=0;}
	document.getElementById('slider_image').setAttribute('src', link_value+images[counter]);
	document.getElementById('slider_image').style.opacity = 1;
}

document.getElementById('slider_image').style.opacity = 1;

setInterval(function(){  //Автослайдер
	if(document.getElementById('slider_image').style.opacity >= -1) {
		document.getElementById('slider_image').style.opacity -= .002;}
	if(document.getElementById('slider_image').style.opacity == 0) {
		counter++;
		if(counter==images.length) {counter=0;}
		document.getElementById('slider_image').setAttribute('src', link_value+images[counter]); }
	if(document.getElementById('slider_image').style.opacity == -0.04) {
		document.getElementById('slider_image').style.opacity = 1; }
}, 50);

//выпаающее меню бутстраповское
var open_close = true;
function collapse_display_function() {
if(open_close) {document.getElementById('navbarCollapse').classList.add("foo"); open_close = false; return }
if(!open_close) {document.getElementById('navbarCollapse').classList.remove("foo"); open_close = true; return }	
}

function show_contacts() {
	alert('mob: +380(93)999-99-99 \nskype: evgeny2234 \nDruzhby narodov 268 str. ');
}