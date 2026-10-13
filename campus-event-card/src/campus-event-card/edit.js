
import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';

import {
    Button,
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
        eventImageId,
        eventImageUrl,
        eventImageAlt,
    } = attributes;

    // Keep the date display consistent with the published card.
    const formattedDate = eventDate
        ? dateI18n('F j, Y \\a\\t g:i A', eventDate)
        : '';

    // Only preview registration for standard web URLs.
    const validRegistrationUrl = /^https?:\/\//i.test(
        registrationUrl?.trim() || ''
    );

    // Store the selected image and its Media Library alternative text.
    const onSelectImage = (media) => {
        setAttributes({
            eventImageId: media.id,
            eventImageUrl: media.url,
            eventImageAlt: media.alt || '',
        });
    };

    const removeImage = () => {
        setAttributes({
            eventImageId: 0,
            eventImageUrl: '',
            eventImageAlt: '',
        });
    };

    return (
        <>
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
                    />
                </PanelBody>

                <PanelBody title="Event Image" initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={eventImageId}
                            render={({ open }) => (
                                <Button
                                    variant="secondary"
                                    onClick={open}
                                >
                                    {eventImageId
                                        ? 'Replace Image'
                                        : 'Select Image'}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    {eventImageUrl && (
                        <>
                            <TextControl
                                label="Image Alternative Text"
                                value={eventImageAlt}
                                onChange={(value) =>
                                    setAttributes({
                                        eventImageAlt: value,
                                    })
                                }
                                help="Describe meaningful image content. Leave blank for decorative images."
                            />

                            <Button
                                variant="tertiary"
                                isDestructive
                                onClick={removeImage}
                            >
                                Remove Image
                            </Button>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                {/* Show the selected image above the event details. */}
                {eventImageUrl && (
                    <img
                        className="event-image"
                        src={eventImageUrl}
                        alt={eventImageAlt}
                    />
                )}

                <RichText
                    tagName="h3"
                    placeholder="Enter event title..."
                    value={eventTitle}
                    onChange={(value) =>
                        setAttributes({ eventTitle: value })
                    }
                />

                <div className="event-details">
                    {formattedDate && (
                        <p className="event-date">{formattedDate}</p>
                    )}

                    {eventLocation && (
                        <p className="event-location">{eventLocation}</p>
                    )}
                </div>

                <RichText
                    tagName="p"
                    className="event-description"
                    placeholder="Enter event description..."
                    value={eventDescription}
                    onChange={(value) =>
                        setAttributes({ eventDescription: value })
                    }
                />

                {/* Preview the button without making it clickable. */}
                {validRegistrationUrl && (
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
