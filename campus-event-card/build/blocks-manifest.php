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
		'icon' => 'smiley',
		'description' => 'A customizable event card with event details and optional registration.',
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
	)
);
