(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	$( window ).load(function() {

		/*
		* Initialize Typeahead
		*/

		window.possibleTargets = [{"1":{"title":"English Blog Post Test","permalink":"http:\/\/wplab.local\/blog\/english-blog-post-test\/","post_type":"post"},"2":{"title":"Blog","permalink":"http:\/\/wplab.local\/blog\/","post_type":"page"},"3":{"title":"New Test Page","permalink":"http:\/\/wplab.local\/new-test-page\/","post_type":"page"},"4":{"title":"Another Test","permalink":"http:\/\/wplab.local\/blog\/another-test\/","post_type":"post"},"5":{"title":"Our Blog","permalink":"http:\/\/wplab.local\/our-blog\/","post_type":"page"},"6":{"title":"Content","permalink":"http:\/\/wplab.local\/137-2\/","post_type":"page"},"7":{"title":"Home","permalink":"http:\/\/wplab.local\/","post_type":"page"},"8":{"title":"Divi Sandbox","permalink":"http:\/\/wplab.local\/divi-sandbox\/","post_type":"page"},"9":{"title":"Form Test","permalink":"http:\/\/wplab.local\/form-test\/","post_type":"page"},"10":{"title":"English Downloads","permalink":"http:\/\/wplab.local\/english-downloads\/","post_type":"page"},"11":{"title":"Downloads Test","permalink":"http:\/\/wplab.local\/acf-test\/","post_type":"page"},"12":{"title":"Welcome to the Gutenberg Editor","permalink":"http:\/\/wplab.local\/?p=20","post_type":"post"},"13":{"title":"Test Post 2","permalink":"http:\/\/wplab.local\/blog\/test-post-2\/","post_type":"post"},"14":{"title":"Welcome to the Gutenberg Editor","permalink":"http:\/\/wplab.local\/?p=12","post_type":"post"},"15":{"title":"Hello world!","permalink":"http:\/\/wplab.local\/blog\/hello-world\/","post_type":"post"}}];

		typeof $.typeahead === 'function' && $.typeahead({
            input: ".js-typeahead",
            minLength: 1,
            maxItem: 15,
			order: "asc",
			dynamic: true,
			hint: true,
			display: ['title'],
            href: "/beers/{{group}}/{{display}}/",
            emptyTemplate: 'No result for "{{query}}"',
            source: window.possibleTargets,
            callback: {
                /* onReady: function (node) {
                    this.container.find('.' + this.options.selector.dropdownItem + '.group-ale a').trigger('click')
                }, */
                /* onDropdownFilter: function (node, query, filter, result) {
                    console.log(query)
                    console.log(filter)
                    console.log(result)
                } */
            },
            debug: true
		});
		

		/*
		* Admin Bar Launcher
		*/

		// when the launcher query changes 
		$("#tabl-query").keypress(function() { 

			console.log("DBG query changed");   
							  
			// get list of targets using Ajax
			$.post(ajaxurl, {

					action: "get_launcher_targets",
					user_query: this.value   
					               
				}, function ( data ) {

					// process the received targets
					processResponse ( data );

				}
			);

		}); // end on query change

		/*
		* Process the received targets
		*/
		function processResponse( response ) {

			console.log("DBG response received");
			window.possibleTargets = response;
			console.log( window.possibleTargets )

		} // end processResponse



	}); // end window load

})( jQuery );
