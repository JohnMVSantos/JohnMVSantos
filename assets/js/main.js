/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a'),
			selectedNav = null;

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links and clear any previous scroll lock.
					$nav_a.removeClass('active active-locked');
					selectedNav = $this.attr('href');

				// Keep the clicked link active while Scrolly moves to its section.
					$this.addClass('active');

					var $target = $($this.attr('href')),
						offset = window.innerWidth > 960 ? $('#header').outerHeight() : 0;

					if ($target.length > 0)
						$('html, body').stop().animate({ scrollTop: $target.offset().top - offset }, 1000, 'swing');

					window.setTimeout(function() {
						if (selectedNav == $this.attr('href'))
							selectedNav = null;
					}, 1200);

			})
			.each(function() {

				var	$this = $(this),
					href = $this.attr('href');

				// Cross-page link? Bail.
					if (href.charAt(0) != '#')
						return;

				var	id = href,
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// Do not let another section overwrite the clicked link during scrolling.
								if (selectedNav != null) {

									if (href == selectedNav) {
										$nav_a.removeClass('active');
										$this.addClass('active');
									}

								}
								else {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

						}
					});

			});

	// Scrolly.
		$('.scrolly').not('#top-link').not('#nav a').scrolly();

		$('#top-link')
			.off('click.scrolly')
			.on('click.home', function(e) {
				if ($(this).attr('href').charAt(0) != '#')
					return;

				e.preventDefault();
				e.stopImmediatePropagation();
				window.scrollTo(0, 0);
			});

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);