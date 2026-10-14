
import {
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        showPastEvents,
        eventsPerPage,
        selectedCategory,
    } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title="Event Listing Settings" initialOpen={true}>
                    <SelectControl
                        label="Event Category"
                        value={selectedCategory}
                        options={[
                            { label: 'All Categories', value: '' },
                            { label: 'Academic', value: 'Academic' },
                            { label: 'Athletics', value: 'Athletics' },
                            { label: 'Community', value: 'Community' },
                            { label: 'Student Life', value: 'Student Life' },
                        ]}
                        onChange={(value) =>
                            setAttributes({ selectedCategory: value })
                        }
                        help="Only show events from the selected category."
                    />

                    <ToggleControl
                        label="Show Past Events"
                        checked={showPastEvents}
                        onChange={(value) =>
                            setAttributes({ showPastEvents: value })
                        }
                        help="Include events that have already occurred."
                    />

                    <RangeControl
                        label="Number of Events"
                        value={eventsPerPage}
                        onChange={(value) =>
                            setAttributes({ eventsPerPage: value })
                        }
                        min={1}
                        max={12}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <h3>Campus Event Listing</h3>
                <p>
                    Event listings will appear here on the published page.
                </p>
                <p>
                    <strong>Category:</strong>{' '}
                    {selectedCategory || 'All Categories'}
                </p>
                <p>
                    <strong>Show Past Events:</strong>{' '}
                    {showPastEvents ? 'Yes' : 'No'}
                </p>
                <p>
                    <strong>Number of Events:</strong> {eventsPerPage}
                </p>
            </div>
        </>
    );
}
