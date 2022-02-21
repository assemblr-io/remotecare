# Remote Care Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  It is an interactive, SPA Dashboard that allows users to visualise the burden of patients currently under care.

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
- weighting of the Heatmap is a result of age and conditions.  THe older and more conditions a patient has, the higher the weighting they have for the heatmap
-

## Technical Features
- React SPA app
- Utilising Material UI components
- MongoDB NoSQL Atlas cluster with Kubernetes 
- Google Maps API
- Node.js and Express built API
- Full Stack application utilising MVC structure.
- markers size based upon zoom state
- all filters utilise state and effect hooks
- heatmap weight is log(age)*num(conditions) - there is the ability to also weight individual conditions OR how long the patient has had the condition into the weighting.
- API allows connection to any third-party data source.

### `npm start`

Runs the React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run api test`

Launches the Node.js Express Server managing the API and server requests

## Features to be implemented
- wire up the total kilometers travelled (total) and per appointment using DistanceMatrix
- Attach to the patient details both the appointment, total kms, and total in summary component
- allow filtering by quartiles of total kms to be travelled by patients (so upper 25th quartile will show you the upper 25% of patients travelling the most)
- patient name search filters DOM

## Features to be developed/refined (User Experience)
- should users manage/edit patients in the dashboard or assume it is done in the source clinical/administrative backend and rendered in real-time on the dashboard only?
- Sort patient details by total road kms?

## Bugs
- logic error between clicking on a marker and opening accordion - marker click opens accordion; accordion click does not clear marker click due to state effect being triggered.  it is a sequencing issue dues to poor logic!

* Desired user experience: user clicks marker - opens details.  User clicks off, closes accordion and clears marker, clicking on another accordion closes others and opens that accordion and marks the marker with infoWindow.

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

