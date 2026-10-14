
<?php
/**
 * Server-side rendering for the Campus Event Listing block.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Read the settings configured in the Gutenberg editor.
$show_past_events = ! empty( $attributes['showPastEvents'] );

$events_per_page = isset( $attributes['eventsPerPage'] )
    ? max( 1, min( 12, absint( $attributes['eventsPerPage'] ) ) )
    : 6;

$selected_category = isset( $attributes['selectedCategory'] )
    ? sanitize_text_field( $attributes['selectedCategory'] )
    : '';

// Configure the event query.
$query_args = array(
    'post_type'      => 'campus_event',
    'post_status'    => 'publish',
    'posts_per_page' => $events_per_page,
    'meta_key'       => 'campus_event_date',
    'orderby'        => 'meta_value',
    'order'          => 'ASC',
);

// Build optional metadata filters.
$meta_filters = array(
    'relation' => 'AND',
);

// Exclude past events unless the editor enables them.
if ( ! $show_past_events ) {
    $meta_filters[] = array(
        'key'     => 'campus_event_date',
        'value'   => current_datetime()->format( 'Y-m-d' ),
        'compare' => '>=',
        'type'    => 'CHAR',
    );
}

// Filter by category when one is selected.
if ( '' !== $selected_category ) {
    $meta_filters[] = array(
        'key'     => 'campus_event_category',
        'value'   => $selected_category,
        'compare' => '=',
    );
}

if ( count( $meta_filters ) > 1 ) {
    $query_args['meta_query'] = $meta_filters;
}

// Retrieve published events matching the selected settings.
$events = new WP_Query( $query_args );

// Adjust the heading based on whether past events are included.
$listing_heading = $show_past_events
    ? 'All Campus Events'
    : 'Upcoming Campus Events';
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <h3><?php echo esc_html( $listing_heading ); ?></h3>

    <?php if ( $events->have_posts() ) : ?>
        <div class="campus-events-grid">
            <?php while ( $events->have_posts() ) : $events->the_post(); ?>
                <?php
                $event_id   = get_the_ID();
                $event_date = get_post_meta( $event_id, 'campus_event_date', true );
                $location   = get_post_meta( $event_id, 'campus_event_location', true );
                $category   = get_post_meta( $event_id, 'campus_event_category', true );

                // Determine event status using the WordPress site timezone.
                $today     = current_datetime()->format( 'Y-m-d' );
                $event_day = $event_date ? substr( $event_date, 0, 10 ) : '';
                $status    = '';

                if ( $event_day ) {
                    if ( $event_day > $today ) {
                        $status = 'Upcoming';
                    } elseif ( $event_day === $today ) {
                        $status = 'Today';
                    } else {
                        $status = 'Past Event';
                    }
                }

                // Format the date for visitors.
                $formatted_date = '';

                if ( $event_date ) {
                    $date_object = date_create_immutable(
                        $event_date,
                        wp_timezone()
                    );

                    if ( $date_object ) {
                        $formatted_date = wp_date(
                            'F j, Y \a\t g:i A',
                            $date_object->getTimestamp()
                        );
                    }
                }

                // Prefer the WordPress Featured Image.
                $image_html = '';

                if ( has_post_thumbnail( $event_id ) ) {
                    $image_html = get_the_post_thumbnail(
                        $event_id,
                        'large',
                        array(
                            'class' => 'campus-event-listing-image',
                        )
                    );
                } else {
                    // Fall back to the image stored in the Event Card block.
                    $blocks = parse_blocks(
                        get_post_field( 'post_content', $event_id )
                    );

                    foreach ( $blocks as $block ) {
                        if ( 'create-block/campus-event-card' !== $block['blockName'] ) {
                            continue;
                        }

                        $image_url = $block['attrs']['eventImageUrl'] ?? '';
                        $image_alt = $block['attrs']['eventImageAlt'] ?? '';

                        if ( $image_url ) {
                            $image_html = sprintf(
                                '<img class="campus-event-listing-image" src="%s" alt="%s" loading="lazy">',
                                esc_url( $image_url ),
                                esc_attr( $image_alt )
                            );
                        }

                        break;
                    }
                }
                ?>

                <article class="campus-event-listing-card">

                    <?php if ( $image_html ) : ?>
                        <a href="<?php echo esc_url( get_permalink( $event_id ) ); ?>">
                            <?php echo $image_html; // WordPress-generated or escaped HTML. ?>
                        </a>
                    <?php endif; ?>

                    <h4>
                        <a href="<?php echo esc_url( get_permalink( $event_id ) ); ?>">
                            <?php echo esc_html( get_the_title() ); ?>
                        </a>
                    </h4>

                    <?php if ( $formatted_date ) : ?>
                        <div class="campus-event-listing-date-row">
                            <p class="campus-event-listing-date">
                                <?php echo esc_html( $formatted_date ); ?>
                            </p>

                            <?php if ( $status ) : ?>
                                <span class="campus-event-listing-status <?php echo esc_attr( sanitize_title( $status ) ); ?>">
                                    <?php echo esc_html( $status ); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>

                    <?php if ( $location ) : ?>
                        <p class="campus-event-listing-location">
                            <?php echo esc_html( $location ); ?>
                        </p>
                    <?php endif; ?>

                    <?php if ( $category ) : ?>
                        <p class="campus-event-listing-category">
                            <?php echo esc_html( $category ); ?>
                        </p>
                    <?php endif; ?>

                </article>

            <?php endwhile; ?>
        </div>

        <?php wp_reset_postdata(); ?>

    <?php else : ?>
        <p>No campus events match the selected filters.</p>
    <?php endif; ?>
</div>
