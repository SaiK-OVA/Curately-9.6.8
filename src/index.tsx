// import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './assets/fonts/_font.scss'
// import './assets/font-segoe/_font.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // (import.meta.env.VITE_ENV === "development") ?
  // <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  // </React.StrictMode>
  // :
  // <HashRouter>
  //     <App />
  //   </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// index.html


  
// <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/android-chrome-192x192.png" />
// <link rel="apple-touch-icon" href="%PUBLIC_URL%/android-chrome-512x512.png" /> -->

// <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
// <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
// <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> -->

// <!--
//   manifest.json provides metadata used when your web app is installed on a
//   user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
// -->
// <!-- <link rel="stylesheet" href="%PUBLIC_URL%/fonts/_font.css"  type = "text/css" /> -->
// <!--
//     Notice the use of %PUBLIC_URL% in the tags above.
//     It will be replaced with the URL of the `public` folder during the build.
//     Only files inside the `public` folder can be referenced from the HTML.

//     Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
//     work correctly both with client-side routing and a non-root public URL.
//     Learn how to configure a non-root public URL by running `npm run build`.
//   -->
// <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> -->
// <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Symbols+Outlined" rel="stylesheet"> -->


// <!--
//     This HTML file is a template.
//     If you open it directly in the browser, you will see an empty page.

//     You can add webfonts, meta tags, or analytics to this file.
//     The build step will place the bundled scripts into the <body> tag.

//     To begin the development, run `npm start` or `yarn start`.
//     To create a production bundle, use `npm run build` or `yarn build`.
//   -->

// <!-- Start of HubSpot Embed Code -->
// <!-- <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/45279392.js"></script> -->
// <!-- End of HubSpot Embed Code -->