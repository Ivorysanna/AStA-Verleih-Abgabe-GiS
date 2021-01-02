"use strict";
function communicate(_url) {
    // try to communicate
    let promise = fetch(_url, {
        mode: 'no-cors',
    });
    // establish the functions to call when communications 1. succeeds, 2. fails
    promise.then(handleSuccess, handleFailure);
    console.log(promise);
}
function handleFailure(_response) {
    console.log("Failure", _response);
}
function handleSuccess(_response) {
    console.log("Success", _response);
}
communicate("http://www.hs-furtwangen.de");
//# sourceMappingURL=test.js.map