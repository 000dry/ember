# EMBER TECH TEST

### Getting started

This is a vite app using SWC, to install and run do the following:

- `yarn install`
- `yarn dev`

### Using the app

The home route will load a list of trips from the current day.

To navigate to a trip, click one.

From there you will be presented with a view of the trip. To interact with the trip, you can scroll the location chips listed in the sidebar. Letting the scrollbar rest will then trigger the map to focus on the location at the top of the list.

To get more information on a location, click the chip in the list to reveal more information. This locks the scrollbar in place until the user either clicks the 'X' close icon in the information bar, or clicks the highlighted chip in the list a second time.

### TODO:

Although some some work has been started, with time constraints some have not been fully progress. Features to finish/to add:

- Clicking markers on the map should scroll the corresponding chip in the sidebar into view and bring up the information panel
- Navigating back to the original page - there is some issue whilst the map is unmounting that causes an error. This would need to be resolved.
- Refine scrolling behaviour - smoothen out the scrolling so that scrolling to specific chips is easier. Perhaps synthetically slow the scroll. There also seems to be an issue where the final item in the list doesn't necessarily fly to the correct location.