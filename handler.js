function renderResponse(xmltxt){ 
    try {
        let doc = DOMPARSER(xmltxt, "text/xml");
        let heading = document.createElement('h1');
        heading.textContent = url.hostname;
        frag.appendChild(heading);
        doc.querySelectorAll('item').forEach(function(item) {
            let temp = document.importNode(document.querySelector('template').content, true);
            let i = item.querySelector.bind(item);
            let t = temp.querySelector.bind(temp);
            t('h2').textContent = i('title') ? i('title').textContent : '-';
            t('a').textContent = t('a').href = i('link') ? i('link').textContent : '#';
            t('p').innerHTML = i('description') ? i('description').textContent : '-';
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
