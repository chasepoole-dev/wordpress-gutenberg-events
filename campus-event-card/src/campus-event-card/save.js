
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
    const {
        eventTitle,
        eventDate,
        eventLocation,
        eventDescription,
    } = attributes;

    // Format the event date consistently with the editor.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    return (
        <div {...useBlockProps.save()}>
            <RichText.Content
                tagName="h3"
                value={eventTitle}
            />

            {/* Group event details for consistent styling. */}
            <div className="event-details">
                {eventDate && (
                    <p className="event-date">
                        {formattedDate}
                    </p>
                )}

                {eventLocation && (
                    <p className="event-location">
                        {eventLocation}
                    </p>
                )}
            </div>

            {eventDescription && (
                <RichText.Content
                    tagName="p"
                    className="event-description"
                    value={eventDescription}
                />
            )}
        </div>
    );
}
