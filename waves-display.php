<?php 
	/*
	Plugin Name:  Waves Display
	Plugin URI:   https://github.com/morganleek/waves-display-react-wpack
	Description:  WP Plugin for displaying buoy data
	Version:      2.2.1
	Author:       https://morganleek.me/
	Author URI:   https://morganleek.me/
	License:      GPL2
	License URI:  https://www.gnu.org/licenses/gpl-2.0.html
	Text Domain:  wporg
	Domain Path:  /languages
	*/

	// Security
	defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
	
	// Plugin Data
	require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	$plugin_data = get_plugin_data( __FILE__ );
	
	// Paths
	define( 'WAD__PLUGIN_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
	define( 'WAD__PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'WAD__VERSION', $plugin_data['Version'] );

	// Admin
	require_once( WAD__PLUGIN_DIR . 'includes/admin.php' );

	// Display 
	require_once( WAD__PLUGIN_DIR . 'includes/display.php' );

	// Templates 
	require_once( WAD__PLUGIN_DIR . 'includes/templates.php' );

	// Require the composer autoload for getting conflict-free access to enqueue
	require_once __DIR__ . '/vendor/autoload.php';

	// Do stuff through this plugin
	class WavesDisplayReactWpackInit {
		public $enqueue;

		public function __construct() {
			$this->enqueue = new \WPackio\Enqueue(
				'wavesDisplayReactWpack',
				'dist',
				'2.0.0',
				'plugin',
				__FILE__
			);

			add_action( 'wp_enqueue_scripts', [ $this, 'plugin_enqueue' ] );
		}

		public function plugin_enqueue() {
			$assets = $this->enqueue->enqueue( 'app', 'main', [] );

			// Extras
			$options = get_option('wad_options');

			$obsTableFields = [];
			if( !empty( $options['obs_table_fields'] ) ) {
				$obs = str_replace( ' ', '', $options['obs_table_fields'] );
				$obsTableFields = explode( ',', $obs );
			}
			
			$entry_point = array_pop( $assets['js'] );
			
			wp_localize_script( 
				$entry_point['handle'], 
				'wad',
				array( 
					'ajax' => admin_url( 'admin-ajax.php' ),
					'plugin' => WAD__PLUGIN_URL,
					'googleApiKey' => $options['maps_key'],
					'googleLat' => $options['maps_lat'],
					'googleLng' => $options['maps_lng'],
					'googleShowAllBuoys' => $options['maps_show_all_buoys'],
					'obs_table_fields' => $obsTableFields,
					'buoy_display_key' => isset( $options['buoy_display_key'] ) ? $options['buoy_display_key'] : "0",
					'buoy_display_init_current' => isset( $options['buoy_display_init_current'] ) ? $options['buoy_display_init_current'] : "0",
					'buoy_display_init_historic' => isset( $options['buoy_display_init_historic'] ) ? $options['buoy_display_init_historic'] : "0",
					'buoy_display_require_user_info' => isset( $options['buoy_display_require_user_info'] ) ? $options['buoy_display_require_user_info'] : "0",
					'user_data_nonce' => wp_create_nonce( 'user_submitted_data' . date( 'YmdHa') )
				)
			);

			wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css', array(), '6.2.0' );
		}
	}


	// Init
	new WavesDisplayReactWpackInit();