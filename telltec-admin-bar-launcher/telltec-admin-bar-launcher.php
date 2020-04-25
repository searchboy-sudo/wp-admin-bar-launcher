<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/aaronmeder/wp-admin-bar-launcher
 * @since             1.0.0
 * @package           Tabl
 *
 * @wordpress-plugin
 * Plugin Name:       Admin Bar Launcher
 * Plugin URI:        https://github.com/aaronmeder/wp-admin-bar-launcher
 * Description:       Adds a quick launcher to your admin bar to instantly jump to Pages, Posts or Custom Post Types.
 * Version:           1.0.0
 * Author:            Aaron Meder
 * Author URI:        http://twitter.com/aaronmeder
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       tabl
 * Domain Path:       /languages
 * 
 * "Tabl" is short for Telltec Admin Bar Launcher and is used for prefixing variables, functions and classes.
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'TABL_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-tabl-activator.php
 */
function activate_tabl() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tabl-activator.php';
	Tabl_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-tabl-deactivator.php
 */
function deactivate_tabl() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tabl-deactivator.php';
	Tabl_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_tabl' );
register_deactivation_hook( __FILE__, 'deactivate_tabl' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-tabl.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_tabl() {

	$plugin = new Tabl();
	$plugin->run();

}
run_tabl();
