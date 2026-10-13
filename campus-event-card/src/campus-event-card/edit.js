
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { DateTimePicker, PanelBody, TextControl } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        eventTitle,
        eventDate,
        eventLocation,
        eventDescription,
    } = attributes;

    // Format the stored date without changing its original value.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    return (
        <>
            {/* Event settings appear in the WordPress editor sidebar. */}
            <InspectorControls>
                <PanelBody title="Event Details" initialOpen={true}>
                    <div className="event-date-picker">
                        <p><strong>Event Date and Time</strong></p>

                        {/* Save the selected date as a date string. */}
                        <DateTimePicker
                            currentDate={eventDate || undefined}
                            onChange={(value) => setAttributes({ eventDate: value })}
                            is12Hour={true}
                        />
                    </div>

                    <TextControl
                        label="Event Location"
                        value={eventLocation}
                        onChange={(value) => setAttributes({ eventLocation: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <RichText
                    tagName="h3"
                    placeholder="Enter event title..."
                    value={eventTitle}
                    onChange={(value) => setAttributes({ eventTitle: value })}
                />

                {/* Display a readable date when one has been selected. */}
                {eventDate && <p>{formattedDate}</p>}

                <p>{eventLocation}</p>

                {/* Allow formatted text in the event description. */}
                <RichText
                    tagName="p"
                    placeholder="Enter event description..."
                    value={eventDescription}
                    onChange={(value) => setAttributes({ eventDescription: value })}
                />
            </div>
        </>
    );
}
