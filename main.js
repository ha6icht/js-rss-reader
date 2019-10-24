const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser());
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const feedUrl = "https://blog.grizzley.ch/feed/";

document.querySelector('output').style.display = 'none';
let frag = document.createDocumentFragment();
let hasBegun = true;

function request(url) {
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhr.responseType = 'text';

	xhr.onreadystatechange = function (){
		if (xhr.readyState == 4){
			try {
				let doc = DOMPARSER(xhr.response, "text/xml");
				let heading = document.createElement('h1');
				heading.textContent = url.hostname;
				frag.appendChild(heading);
				doc.querySelectorAll('item').forEach((item) => {
					let temp = document.importNode(document.querySelector('template').content, true);
					let i = item.querySelector.bind(item);
					let t = temp.querySelector.bind(temp);
					t('h2').textContent = !!i('title') ? i('title').textContent : '-';
					t('a').textContent = t('a').href = !!i('link') ? i('link').textContent : '#';
					t('p').innerHTML = !!i('description') ? i('description').textContent : '-';
					t('h3').textContent = url.hostname;
					frag.appendChild(temp);
				})
			} catch (e) {
				console.error('Error in parsing the feed');
			}
			
			if(hasBegun) {
				document.querySelector('output').textContent = '';
				document.querySelector('.loader').style.display = 'none'; 
				hasBegun = false;
			}
			document.querySelector('output').appendChild(frag);
			document.querySelector('output').style.display = 'block';
		}
	}
	xhr.open('GET', url);
	xhr.send();	
}

const url = proxyUrl + feedUrl;
const xmlTxt = request(url); 
