const DOMPARSER = new DOMParser();
/* Fetch URLs from JSON */
fetch('urls.json').then((res) => {
	res.text().then((data) => {
		JSON.parse(data).urls.forEach((u) => {
			try {
				var url = new URL(u);
				console.log(url.href);
			}
			catch (e) {
				console.error('URL invalid');
				return;
			}
			fetch(url.href, {mode: 'no-cors'}).then((res) => {
				res.text().then((xmlTxt) => {
					console.log(res);
					console.log(xmlTxt);
					/* Fetch the RSS Feed */
					try {
						/* Parse the RSS Feed and display the content */
						let doc = DOMPARSER.parseFromString(xmlTxt, 'text/xml');
						console.log(doc);
						/*let heading = document.createElement('h1');
						heading.textContent = url.hostname;
						frag.appendChild(heading);
						doc.querySelectorAll('item').forEach((item) => {
							let temp = document.importNode(document.querySelector('template').content, true);
							let i = item.querySelector.bind(item);
							let t = temp.querySelector.bind(temp);
							t('h2').textContent = i === 'title' ? i('title').textContent : '-';
							t('a').textContent = t('a').href = !!i('link') ? i('link').textContent : '#';
							t('p').innerHTML = i === 'description' ? i('description').textContent : '-';
							t('h3').textContent = url.hostname;
							frag.appendChild(temp);
						})*/
					}catch (e) {
						console.error('Error in parsing the feed');
						return;
					}
					
					/*fetch(doc).then((res) => {
						res.text().then((xmlTxt) => {
							
							try {
								let doc = DOMPARSER.parseFromString(xmlTxt, "text/xml");
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
								hasBegun = false;
							}
							document.querySelector('output').appendChild(frag);
						})
					}).catch(() => console.error('Error in fetching the RSS feed'))
				})*/
				}).catch(() => console.error('Error in fetching the xml-site'));
			})
		})
	})
}).catch(() => console.error('Error in fetching the URLs json'));
