# Remote Care Dashboard

Remote care was developed over a 3 day sprint, taking data feeds from a Qld Health NoSQL backend. It is to be used by nurses providing services to remote based patients who are travelling for outpatient specialist appointments. Currently there is no way of visualising which patients are travelling the most, who is the most unwell, and the total burden of travel on remote based patients.

This solution requirements included the need for an intuitive interface requiring a 5-minute stand-up to train, auth with BCrypt and salting. It could only read data.

The product is a google map that drives the search - showing only those patients that live within the visible map area - showing a marker for each patient, and their details in an accordion on the right hand side. A heat map and selectors for disease and age are included that alter the search parameters dynamically, redrawing the return values in-DOM.

A heat map is calculated based upon patient age and condition complexity. The weighting of heatmap gradient is only relative to those pateints visible within the viewport to ensure it shows the worst to best in condition relative to the search parameters.

Travel distances in km's and hrs (road travel time) between the patients home address and the appointment address is shown next to the patients details and can be sorted from greatest to lowest.

A single page application with now screen refresh or reload, resulting in the use of React for the UI.

## User Features

- Filter by one or multiple disease types
- Filter by one or multiple specialist appointments
- Filter by patient age range
- toggle a heatmap on/off
- search patients by name
- see patient details in details accordion
- click on marker to see basic patient information
- Calculates road kms for all appointments, between the patient address and the appt. address, providing total road km's per patient and per appt.
- The map interaction drives all search and selection of the patients to show
- weighting of the Heatmap is a result of age and conditions. THe older and more conditions a patient has, the higher the weighting they have for the heatmap

## Technical Features

- React SPA app
- Utilising Material UI components
- MongoDB NoSQL Atlas cluster with Kubernetes
- Google Maps API
- Google DistanceMatrixService implemented to calculate patietn distance between home and clinic address
- Node.js and Express built API
- Full Stack application utilising MVC structure.
- markers size based upon zoom state
- all filters utilise state and effect hooks
- heatmap weight is log(age)\*num(conditions) - there is the ability to also weight individual conditions OR how long the patient has had the condition into the weighting.
- API allows connection to any third-party data source.

### `npm start`

Runs the React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run api`

Launches the Node.js Express Server managing the API and server requests on PORT:2020

## Features to be implemented

- have DistanceMatrixService only calculate the distance from home->clinic once per appt and store against patient appointment in mongoDB to cache and save $ on the service use - only re-check if either of the address fields change
- Attach to the patient details both the appointment, total kms, and total in summary component
- allow filtering or sort ordering of the accordion by quartiles of total kms to be travelled by patients
- implement the firebase auth login

## Features to be developed/refined (User Experience)

- should users manage/edit patients in the dashboard or assume it is done in the source clinical/administrative backend and rendered in real-time on the dashboard only?
- Sort patient details by total road kms?

## Ideas to consider

- click a button to show clinics close to the patient offering the services their appointments need

## Bugs

- logic error between clicking on a marker and opening accordion - marker click opens accordion; accordion click does not clear marker click due to state effect being triggered. it is a sequencing issue dues to poor logic!

* Desired user experience: user clicks marker - opens details. User clicks off, closes accordion and clears marker, clicking on another accordion closes others and opens that accordion and marks the marker with infoWindow.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
