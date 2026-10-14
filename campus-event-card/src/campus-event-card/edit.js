
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
	SelectControl,
    TextControl,
} from '@wordpress/components';

import { dateI18n } from '@wordpress/date';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        eventTitle,
        eventDate,
        eventLocation,
		eventCategory,
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

		
    // Determine the event status for the editor preview.
    const getEventStatus = () => {
        if (!eventDate) {
            return null;
        }

        const eventDay = eventDate.slice(0, 10);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDay)) {
            return null;
        }

        const now = new Date();

        const today = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
        ].join('-');

        if (eventDay > today) {
            return { label: 'Upcoming', type: 'upcoming' };
        }

        if (eventDay === today) {
            return { label: 'Today', type: 'today' };
        }

        return { label: 'Past Event', type: 'past' };
    };

    const eventStatus = getEventStatus();


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
					<SelectControl
						label="Event Category"
						value={eventCategory}
						options={[
							{ label: '— Select Category —', value: '' },
							{ label: 'Academic', value: 'Academic' },
							{ label: 'Athletics', value: 'Athletics' },
							{ label: 'Student Life', value: 'Student Life' },
							{ label: 'Arts & Culture', value: 'Arts & Culture' },
							{ label: 'Community', value: 'Community' },
						]}
						onChange={(value) =>
							setAttributes({ eventCategory: value })
						}
						help="Choose the category that best describes this event."
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
						<div className="event-date-row">
							<p className="event-date">{formattedDate}</p>

							{eventStatus && (
								<span
									className="event-status"
									data-status={eventStatus.type}
								>
									{eventStatus.label}
								</span>
							)}
						</div>
					)}


					{eventLocation && (
						<p className="event-location">{eventLocation}</p>
					)}	
					
								
					{eventCategory && (
						<div className="event-category-row">
							<span className="event-category">
								{eventCategory}
							</span>
						</div>
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
