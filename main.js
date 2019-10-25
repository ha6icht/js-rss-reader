//const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser());
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const feedUrl = "https://blog.grizzley.ch/feed/";

document.querySelector('output').style.display = 'none';
let frag = document.createDocumentFragment();

function getRequest(url) {
	//console.log('xhr');
	var xhr = new XMLHttpRequest();
	
	//xhr.responseType = 'text';

	xhr.onreadystatechange = function (){
		if (xhr.readyState == 4){
			renderResponse(xhr.responseText);
		}
	}
	xhr.open('GET', url);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();	
}

const url = proxyUrl + feedUrl;
getRequest(url); 
