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

		var data = [
			"Affligem Blonde", "Amsterdam Big Wheel", "Amsterdam Boneshaker IPA", "Amsterdam Downtown Brown", "Amsterdam Oranje Summer White",
			"Anchor Liberty Ale", "Beaus Lug Tread Lagered Ale", "Beerded Lady", "Belhaven Best Ale", "Big Rock Grasshopper Wheat",
			"Big Rock India Pale Ale", "Big Rock Traditional Ale", "Big Rock Warthog Ale", "Black Oak Nut Brown Ale", "Black Oak Pale Ale",
			"Boddingtons Pub Ale", "Boundary Ale", "Caffreys", "Camerons Auburn Ale", "Camerons Cream Ale", "Camerons Rye Pale Ale", "Ceres Strong Ale",
			"Cheval Blanc", "Crazy Canuck Pale Ale", "Creemore Springs Altbier", "Crosswind Pale Ale", "De Koninck", "Delirium Tremens",
			"Erdinger Dunkel Weissbier", "Erdinger Weissbier", "Export", "Flying Monkeys Amber Ale", "Flying Monkeys Antigravity",
			"Flying Monkeys Hoptical", "Flying Monkeys Netherworld", "Flying Monkeys Smashbomb", "Fruli", "Fullers Extra Spec Bitter",
			"Fullers London Pride", "Granville English Bay Pale", "Granville Robson Hefeweizen", "Griffon Pale Ale", "Griffon Red Ale",
			"Hacker-Pschorr Hefe Weisse", "Hacker-Pschorr Munchen Gold", "Hockley Dark Ale", "Hoegaarden", "Hops & Robbers IPA", "Houblon Chouffe",
			"James Ready Original Ale", "Kawartha Cream Ale", "Kawartha Nut Brown Ale", "Kawartha Premium Pale Ale", "Kawartha Raspberry Wheat",
			"Keiths", "Keiths Cascade Hop Ale", "Keiths Galaxy Hop Ale", "Keiths Hallertauer Hop Ale", "Keiths Hop Series Mixer",
			"Keiths Premium White", "Keiths Red", "Kilkenny Cream Ale", "Konig Ludwig Weissbier", "Kronenbourg 1664 Blanc", "La Chouffe",
			"La Messager Red Gluten Free", "Labatt 50 Ale", "Labatt Bass Pale Ale", "Lakeport Ale", "Leffe Blonde", "Leffe Brune",
			"Legendary Muskoka Oddity", "Liefmans Fruitesse", "Lions Winter Ale", "Maclays", "Mad Tom IPA", "Maisels Weisse Dunkel",
			"Maisels Weisse Original", "Maredsous Brune", "Matador 2.0 El Toro Bravo", "Mcauslan Apricot Wheat Ale", "Mcewans Scotch Ale",
			"Mill St Belgian Wit", "Mill St Coffee Porter", "Mill St Stock Ale", "Mill St Tankhouse Ale", "Molson Stock Ale", "Moosehead Pale Ale",
			"Mort Subite Kriek", "Muskoka Cream Ale", "Muskoka Detour IPA", "Muskoka Harvest Ale", "Muskoka Premium Dark Ale", "Newcastle Brown Ale",
			"Niagaras Best Blonde Prem", "Okanagan Spring Pale Ale", "Old Speckled Hen", "Ommegang Belgian Pale Ale", "Ommegang Hennepin", "PC IPA",
			"Palm Amber Ale", "Petrus Blonde", "Petrus Oud Bruin Aged Red", "Publican House Ale", "Red Cap", "Red Falcon Ale", "Rickards Dark",
			"Rickards Original White", "Rickards Red", "Rodenbach Grand Cru", "Schofferhofer Hefeweizen", "Shock Top Belgian White",
			"Shock Top Raspberry Wheat", "Shock Top Variety Pack", "Sleeman Cream Ale", "Sleeman Dark", "Sleeman India Pale Ale", "Smithwicks Ale",
			"Spark House Red Ale", "St. Ambroise India Pale Ale", "St. Ambroise Oatmeal Stout", "St. Ambroise Pale Ale", "Stereovision Kristall Wheat",
			"Stone Hammer Dark Ale", "Sunny & Share Citrus Saison", "Tetleys English Ale", "Thirsty Beaver Amber Ale", "True North Copper Altbier",
			"True North Cream Ale", "True North India Pale Ale", "True North Strong", "True North Wunder Weisse", "Twice As Mad Tom IPA",
			"Unibroue La Fin Du Monde", "Unibroue Maudite", "Unibroue Trois Pistoles", "Upper Canada Dark Ale", "Urthel Hop-It Tripel IPA",
			"Waterloo IPA", "Weihenstephan Kristalweiss", "Wellington Arkell Best Bitr", "Wellington County Dark Ale", "Wellington Special Pale", "Wells IPA"
		]

		typeof $.typeahead === 'function' && $.typeahead({
            input: ".js-typeahead",
            minLength: 1,
            maxItem: 15,
            order: "asc",
            hint: true,
            /* group: {
                template: "{{group}} beers!"
            }, 
            maxItemPerGroup: 5,*/
            /* backdrop: {
                "background-color": "#fff"
            }, */
            href: "/beers/{{group}}/{{display}}/",
            //dropdownFilter: "all beers",
            emptyTemplate: 'No result for "{{query}}"',
            source: data,
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
		$("#tabl-query").change(function() { 

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

			console.log("DBG response received", response);

		} // end processResponse



	}); // end window load

})( jQuery );
