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

	}


	public function add_launcher_to_admin_bar($admin_bar) {

		$admin_bar->add_menu( array(
			'id' 		=> 'wpse-form-in-admin-bar',
			'parent' 	=> 'top-secondary',
			'title' => 
				'
					<form class="tabl__form">
						<input type="text" placeholder="Your target" id="tabl-query" class="tabl__query" />
						<input type="submit" value="Jump to" class="tabl__submit" />
					</form>
				'

		));
		
	} // end add_launcher_to_admin_bar


	public function get_launcher_targets() {

		// given title by user
		$title = $_POST['title'];

		// query for possible targets
		$query_args = array(
			'post_type' => 'any',
			'posts_per_page' => -1
		);
		$query = new WP_Query( $query_args );
		$possible_targets = [];
		if ( $query->have_posts() ) {
			$answer = 'has posts';
			while ( $query->have_posts() ) {
				$query->the_post();
				array_push( $possible_targets, get_the_title() );
			}
		} else {
			// no posts found
			$answer = 'no posts';
		}
		wp_reset_postdata();
		//die($query);

		

		// send back response to be received by Ajax
		wp_send_json( "Possible targets " . $answer . " " . json_encode($possible_targets) );

	} // end get_launcher_targets

}
