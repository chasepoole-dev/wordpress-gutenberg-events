# WordPress Gutenberg Events

A custom WordPress Gutenberg block plugin built using React, JavaScript, PHP, and SCSS.

## Overview

This project demonstrates the development of a custom Gutenberg block that allows WordPress users to create and display event cards directly within the block editor.

The goal is to provide an easy-to-use event management experience while following modern WordPress block development practices.

## Features

- Editable event titles and descriptions
- Event date and time selection
- Event location field
- Gutenberg sidebar controls for event settings
- Custom event card styling
- Front-end display of saved event information

## Technologies Used

- **WordPress** – Content management system
- **JavaScript / React** – Gutenberg block editor functionality
- **PHP** – WordPress plugin registration
- **SCSS / CSS** – Event card styling
- **Node.js / npm** – Development dependencies and build tools
- **Git / GitHub** – Version control

## Getting Started

1. Clone this repository.
2. Navigate to the `campus-event-card` directory.
3. Install dependencies using `npm install`.
4. Run `npm run build` to compile the plugin.
5. Copy or link the `campus-event-card` directory into your local WordPress `wp-content/plugins` directory.
6. Activate the plugin from the WordPress admin dashboard.
7. Add the **Campus Event Card** block to a page or post.

For development, run `npm start` to automatically rebuild files as changes are made.

## Project Structure

- `campus-event-card/src/` – Gutenberg block source files
- `campus-event-card/build/` – Compiled WordPress assets
- `campus-event-card/campus-event-card.php` – Main plugin file
- `campus-event-card/package.json` – Dependencies and development scripts

## Future Improvements

- Improved event date and time formatting
- Optional event registration links
- Additional event card customization
- Responsive layout enhancements
- Accessibility and usability improvements

## Project Status

**In Development** – Initial event card functionality is implemented and tested in a local WordPress environment.