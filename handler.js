function renderResponse(xmlTxt){
    let xml; 
    try {
        console.log('OK');
        if(window.DOMParser){
            console.log('Parsing chrome');
            const parser = new DOMParser();
            xml = parser.parseFromString(xmlTxt, "text/xml");
            //console.log(xml);
        }
        else if(window.ActiveXObject){
            console.log('Parsing');
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(xmlTxt);
            console.log(xml);
        }
        let heading = document.createElement('h1');
        heading.textContent = url.hostname;
        frag.appendChild(heading);
        xml.querySelectorAll('item').forEach(function(item) {
            console.log(item);
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

    
    document.querySelector('output').textContent = '';
    document.querySelector('.loader').style.display = 'none'; 
    
    document.querySelector('output').appendChild(frag);
    document.querySelector('output').style.display = 'block';
}
