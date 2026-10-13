
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
    } = attributes;

    // Keep date formatting consistent with the editor.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    // Only allow standard web links for registration.
    const validRegistrationUrl = /^https?:\/\//i.test(registrationUrl?.trim() || '')
        ? registrationUrl.trim()
        : '';

    return (
        <div {...useBlockProps.save()}>
            <RichText.Content
                tagName="h3"
                value={eventTitle}
            />

            <div className="event-details">
                {eventDate && (
                    <p className="event-date">{formattedDate}</p>
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

            {/* Only render registration when a valid web URL is supplied. */}
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
