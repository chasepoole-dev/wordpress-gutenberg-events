
import {
    InspectorControls,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';

import {
    DateTimePicker,
    PanelBody,
    TextControl,
} from '@wordpress/components';

import { dateI18n } from '@wordpress/date';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        eventTitle,
        eventDate,
        eventLocation,
        eventDescription,
        registrationUrl,
        registrationText,
    } = attributes;

    // Display the event date in a readable format.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    return (
        <>
            {/* Event settings are managed in the editor sidebar. */}
            <InspectorControls>
                <PanelBody title="Event Details" initialOpen={true}>
                    <p><strong>Event Date and Time</strong></p>

                    <DateTimePicker
                        currentDate={eventDate || undefined}
                        onChange={(value) =>
                            setAttributes({ eventDate: value })
                        }
                        is12Hour={true}
                    />

                    <TextControl
                        label="Event Location"
                        value={eventLocation}
                        onChange={(value) =>
                            setAttributes({ eventLocation: value })
                        }
                    />
                </PanelBody>

                {/* Registration is optional for each event. */}
                <PanelBody title="Event Registration" initialOpen={true}>
                    <TextControl
                        label="Registration URL"
                        type="url"
                        placeholder="https://example.com/register"
                        value={registrationUrl}
                        onChange={(value) =>
                            setAttributes({ registrationUrl: value })
                        }
                        help="Leave blank if registration is not required."
                    />

                    <TextControl
                        label="Button Text"
                        value={registrationText}
                        onChange={(value) =>
                            setAttributes({ registrationText: value })
                        }
                        help="Text displayed on the registration button."
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <RichText
                    tagName="h3"
                    placeholder="Enter event title..."
                    value={eventTitle}
                    onChange={(value) =>
                        setAttributes({ eventTitle: value })
                    }
                />

                {formattedDate && (
                    <p className="event-date">{formattedDate}</p>
                )}

                {eventLocation && (
                    <p className="event-location">{eventLocation}</p>
                )}

                <RichText
                    tagName="p"
                    placeholder="Enter event description..."
                    value={eventDescription}
                    onChange={(value) =>
                        setAttributes({ eventDescription: value })
                    }
                />

                {/* Preview the registration button when a URL exists. */}
                {registrationUrl && (
                    <div className="event-registration">
                        <span className="event-register-button">
                            {registrationText || 'Register Now'}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
