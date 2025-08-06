# EMBER TECH TEST

### Getting started

This is a vite app using SWC, to install and run do the following:

- `yarn install`
- `yarn dev`

### Using the app

The home route will load a list of trips from the current day.

To navigate to a trip, click one.

From there you will be presented with a view of the trip. To interact with the trip, you can scroll the locations listed in the sidebar. Letting the scrollbar rest will then trigger the map to focus on the location at the top of the list.

To get more information on a location, click the item in the list to reveal more information. This locks the scrollbar in place until the user either clicks the 'X' close icon in the information bar, or clicks the highlighted item in the list a second time.