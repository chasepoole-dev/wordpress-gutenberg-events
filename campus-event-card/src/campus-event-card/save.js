
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
    const {
        eventTitle,
        eventDate,
        eventLocation,
        eventDescription,
        registrationUrl,
        registrationText,
        eventImageUrl,
        eventImageAlt,
    } = attributes;

    // Format the event date for visitors.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    // Only render registration links with an HTTP or HTTPS URL.
    const validRegistrationUrl = /^https?:\/\//i.test(
        registrationUrl?.trim() || ''
    )
        ? registrationUrl.trim()
        : '';

    return (
        <div {...useBlockProps.save()}>
            {/* Display the image only when one has been selected. */}
            {eventImageUrl && (
                <img
                    className="event-image"
                    src={eventImageUrl}
                    alt={eventImageAlt}
                />
            )}

            <RichText.Content
                tagName="h3"
                value={eventTitle}
            />

            <div className="event-details">           
				{formattedDate && (
					<div className="event-date-row">
						<p className="event-date">{formattedDate}</p>

						{/* JavaScript updates this status when the page loads. */}
						<span
							className="event-status"
							data-event-date={eventDate}
							hidden
						></span>
					</div>
				)}


                {eventLocation && (
                    <p className="event-location">{eventLocation}</p>
                )}
            </div>

            {eventDescription && (
                <RichText.Content
                    tagName="p"
                    className="event-description"
                    value={eventDescription}
                />
            )}

            {/* Registration is optional for each event. */}
            {validRegistrationUrl && (
                <div className="event-registration">
                    <a
                        className="event-register-button"
                        href={validRegistrationUrl}
                    >
                        {registrationText || 'Register Now'}
                    </a>
                </div>
            )}
        </div>
    );
}
