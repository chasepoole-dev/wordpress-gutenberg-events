/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/campus-event-card/view.js ***!
  \***************************************/
/**
 * Automatically updates event statuses on the published page.
 * Uses the event's calendar date rather than its start time.
 */

// Return the calendar date in YYYY-MM-DD format.
function getCalendarDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Update every Campus Event Card on the page.
function updateEventStatuses() {
  const statusElements = document.querySelectorAll('.wp-block-create-block-campus-event-card .event-status');
  const today = getCalendarDate(new Date());
  statusElements.forEach(element => {
    const eventDate = element.dataset.eventDate;
    if (!eventDate) {
      return;
    }

    // Extract the date without converting its timezone.
    const eventDay = eventDate.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDay)) {
      return;
    }
    let status;
    if (eventDay > today) {
      status = 'Upcoming';
    } else if (eventDay === today) {
      status = 'Today';
    } else {
      status = 'Past Event';
    }
    element.textContent = status;

    // Apply the appropriate styling for the event status.
    if (status === 'Today') {
      element.dataset.status = 'today';
    } else if (status === 'Past Event') {
      element.dataset.status = 'past';
    } else {
      element.dataset.status = 'upcoming';
    }
    element.hidden = false;
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateEventStatuses);
} else {
  updateEventStatuses();
}
/******/ })()
;
//# sourceMappingURL=view.js.map