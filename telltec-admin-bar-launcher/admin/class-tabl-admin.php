<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Tabl
 * @subpackage Tabl/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Tabl
 * @subpackage Tabl/admin
 * @author     Your Name <email@example.com>
 */
class Tabl_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $tabl    The ID of this plugin.
	 */
	private $tabl;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $tabl       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $tabl, $version ) {

		$this->tabl = $tabl;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Tabl_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Tabl_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->tabl, plugin_dir_url( __FILE__ ) . 'css/tabl-admin.css', array(), $this->version, 'all' );
		
		// 3rd party
		//wp_enqueue_style( 'jquery-typeahead-styles', plugin_dir_url( __FILE__ ) . 'css/jquery.typeahead.min.css', array(), '2.11.0', 'all' );
		wp_enqueue_style( 'tabl-typeahead-styles', plugin_dir_url( __FILE__ ) . 'css/tabl-typeahead.css', array(), '2.11.0', 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Tabl_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Tabl_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->tabl, plugin_dir_url( __FILE__ ) . 'js/tabl-admin.js', array( 'jquery' ), $this->version, false );

		// 3rd party
		wp_enqueue_script( 'jquery-typeahead-scripts', plugin_dir_url( __FILE__ ) . 'js/jquery.typeahead.min.js', array( 'jquery' ), $this->version, false );
	}


	public function add_launcher_to_admin_bar($admin_bar) {

		$admin_bar->add_menu( array(
			'id' 		=> 'wpse-form-in-admin-bar',
			'parent' 	=> 'top-secondary',
			'title' => 
				'
					<form id="tabl" class="tabl__form">
						<div class="typeahead__container">
							<div class="typeahead__field">
								<div class="typeahead__query">
									<input class="js-typeahead tabl__query"
										name="q"
										autocomplete="off">
								</div>
								<div class="typeahead__button">
									<button type="submit">
										<span class="typeahead__search-icon"></span>
									</button>
								</div>
							</div>
						</div>
					</form>
				'

		));
		
	} // end add_launcher_to_admin_bar


	public function get_launcher_targets() {

		// given title by user
		$user_query = $_POST['user_query'];

		// query for possible targets
		$possible_targets = [];
		$query_args = array(
			'post_type' => 'any',
			'posts_per_page' => -1
		);
		$query = new WP_Query( $query_args );

		// if there are targets
		if ( $query->have_posts() ) {

			$answer = 'has posts';

			// get and store the needed data in an array
			$count = 1;
			while ( $query->have_posts() ) {
				$query->the_post();

				$possible_targets[$count]['title'] = get_the_title();
				$possible_targets[$count]['permalink'] = get_the_permalink();
				$possible_targets[$count]['post_type'] = get_post_type();

				$count++;
			}

		} else {

			// no targets found
			$answer = 'no posts';

		}

		// reset queries
		wp_reset_postdata();

		// send back response to be received by Ajax
		wp_send_json( json_encode($possible_targets) );

	} // end get_launcher_targets

}
