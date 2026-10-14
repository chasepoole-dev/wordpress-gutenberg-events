<?php
// This file is generated. Do not modify it manually.
return array(
	'campus-event-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/campus-event-card',
		'version' => '0.1.0',
		'title' => 'Campus Event Card',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'A customizable campus event card with optional images and registration.',
		'example' => array(
			
		),
		'attributes' => array(
			'eventTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'eventDate' => array(
				'type' => 'string',
				'default' => ''
			),
			'eventLocation' => array(
				'type' => 'string',
				'default' => ''
			),
			'eventDescription' => array(
				'type' => 'string',
				'default' => ''
			),
			'registrationUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'registrationText' => array(
				'type' => 'string',
				'default' => 'Register Now'
			),
			'eventImageId' => array(
				'type' => 'number',
				'default' => 0
			),
			'eventImageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'eventImageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'eventCategory' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'campus-event-card',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'campus-event-listing' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/campus-event-listing',
		'version' => '0.1.0',
		'title' => 'Campus Event Listing',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'Display a listing of campus events with filtering and sorting.',
		'textdomain' => 'campus-event-card',
		'attributes' => array(
			'showPastEvents' => array(
				'type' => 'boolean',
				'default' => false
			),
			'eventsPerPage' => array(
				'type' => 'number',
				'default' => 6
			),
			'selectedCategory' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
