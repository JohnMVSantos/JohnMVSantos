(function() {
	var loader = document.currentScript;
	var baseUrl = new URL('.', loader.src);

	function loadScript(path) {
		return new Promise(function(resolve, reject) {
			var script = document.createElement('script');
			script.src = new URL(path, baseUrl);
			script.onload = resolve;
			script.onerror = reject;
			document.body.appendChild(script);
		});
	}

	function loadPartial(path, selector) {
		return fetch(new URL(path, baseUrl))
			.then(function(response) {
				if (!response.ok)
					throw new Error('Unable to load ' + path);

				return response.text();
			})
			.then(function(partial) {
				document.querySelectorAll(selector).forEach(function(placeholder) {
					placeholder.outerHTML = partial;
				});

				if (selector === '[data-site-logo]') {
					document.querySelectorAll('#logo .avatar48 img').forEach(function(image) {
						image.src = new URL('../../images/profile.jpeg', baseUrl);
					});
				}
			});
	}

	loadPartial('../../html_discrete/social.html', '[data-site-social]')
		.then(function() {
			return loadPartial('../../html_discrete/logo.html', '[data-site-logo]');
		})
		.then(function() {
			return loadPartial('../../html_discrete/footer.html', '[data-site-footer]');
		})
		.then(function() {
			return loadScript('https://apis.google.com/js/platform.js');
		})
		.then(function() {
			return loadScript('jquery.min.js');
		})
		.then(function() {
			return loadScript('jquery.scrolly.min.js');
		})
		.then(function() {
			return loadScript('jquery.scrollex.min.js');
		})
		.then(function() {
			return loadScript('browser.min.js');
		})
		.then(function() {
			return loadScript('breakpoints.min.js');
		})
		.then(function() {
			return loadScript('util.js');
		})
		.then(function() {
			return loadScript('main.js?v=8');
		})
		.catch(function(error) {
			console.error(error);
		});
})();
