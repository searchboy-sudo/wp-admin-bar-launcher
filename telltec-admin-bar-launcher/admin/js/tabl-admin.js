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

		const tablAjax = {};

		// when the launcher query changes 
		$("#tabl-query").change(function() { 

			console.log("DBG query changed");   
							  
			// get list of targets using Ajax
			$.post(ajaxurl, {
					//_ajax_nonce: tablAjax.nonce,     //nonce
					action: "get_launcher_targets",            //action
					title: this.value                  //data
				}, function ( data ) {

					// process the received targets
					processResponse ( data );

				}
			);
		

		});

		/*
		* Process the received targets
		*/
		function processResponse( response ) {
			console.log("DBG response received", response);
		}

	});

})( jQuery );
