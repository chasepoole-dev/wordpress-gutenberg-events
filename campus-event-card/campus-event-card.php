<?php
/**
 * Plugin Name:       Campus Event Card
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       campus-event-card
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_campus_event_card_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_campus_event_card_block_init' );


/**
 * Register a custom post type for campus events.
 */
function campus_event_card_register_events() {
    $labels = array(
        'name'          => 'Events',
        'singular_name' => 'Event',
        'add_new_item'  => 'Add New Event',
        'edit_item'     => 'Edit Event',
        'all_items'     => 'All Events',
        'menu_name'     => 'Campus Events',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'show_in_rest'       => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'has_archive'        => true,
        'rewrite'            => array( 'slug' => 'campus-events' ),
    );

    register_post_type( 'campus_event', $args );
}
add_action( 'init', 'campus_event_card_register_events' );



/**
 * Register structured event fields for the REST API.
 */
function campus_event_card_register_event_meta() {
    $fields = array(
        'campus_event_date'     => 'string',
        'campus_event_location' => 'string',
        'campus_event_category' => 'string',
    );

    foreach ( $fields as $field => $type ) {
        register_post_meta(
            'campus_event',
            $field,
            array(
                'type'              => $type,
                'single'            => true,
                'default'           => '',
                'show_in_rest'      => true,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function () {
                    return current_user_can( 'edit_posts' );
                },
            )
        );
    }
}
add_action( 'init', 'campus_event_card_register_event_meta' );


/**
 * Synchronize Campus Event Card attributes with event post metadata.
 */
function campus_event_card_sync_event_meta( $post_id, $post, $update ) {

    // Skip revisions, autosaves, and invalid post objects.
    if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
        return;
    }

    if ( ! $post || 'campus_event' !== $post->post_type ) {
        return;
    }

    // Check whether the post contains our Event Card block.
    $blocks = parse_blocks( $post->post_content );

    foreach ( $blocks as $block ) {

        if ( 'create-block/campus-event-card' !== $block['blockName'] ) {
            continue;
        }

        $attributes = $block['attrs'] ?? array();

        update_post_meta(
            $post_id,
            'campus_event_date',
            sanitize_text_field( $attributes['eventDate'] ?? '' )
        );

        update_post_meta(
            $post_id,
            'campus_event_location',
            sanitize_text_field( $attributes['eventLocation'] ?? '' )
        );

        update_post_meta(
            $post_id,
            'campus_event_category',
            sanitize_text_field( $attributes['eventCategory'] ?? '' )
        );

        // Use the first Event Card found.
        break;
    }
}
add_action( 'save_post_campus_event', 'campus_event_card_sync_event_meta', 10, 3 );


