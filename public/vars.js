// require("../secrets")

// // const script= document.createElement("script")
// // script.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places`

// // document.body.appendChild(script)

// function injectScript(src) {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.async = false;
//         script.src = src;
//         script.addEventListener('load', resolve);
//         script.addEventListener('error', () => reject('Error loading script.'));
//         script.addEventListener('abort', () => reject('Script loading aborted.'));
//         document.head.appendChild(script);
//     });
// }

// injectScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCMAMiym1V80KKAXJFEOYAh0mFQF357u-M&libraries=places`)
//     .then(() => {
//         console.log('Script loaded!');
//     }).catch(error => {
//         console.log(error);
//     })
