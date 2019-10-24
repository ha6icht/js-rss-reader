const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser());
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const feedUrl = "https://blog.grizzley.ch/feed/";

document.querySelector('output').style.display = 'none';
let frag = document.createDocumentFragment();

function getRequest(url) {
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//xhr.responseType = 'text';

	xhr.onreadystatechange = function (){
		if (xhr.readyState == 4){
			renderResponse(xhr.response);
		}
	}
	xhr.open('GET', url);
	xhr.send();	
}

const url = proxyUrl + feedUrl;
getRequest(url); 
