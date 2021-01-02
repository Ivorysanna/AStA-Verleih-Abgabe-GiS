function communicate(_url: RequestInfo): void {
    // try to communicate
    let promise: Promise<Response> = fetch(_url, {
        mode: 'no-cors', // no-cors, *cors, same-origin 
      });
    // establish the functions to call when communications 1. succeeds, 2. fails
    promise.then(handleSuccess, handleFailure);
    console.log(promise);
  }
  
  function handleFailure(_response: Response): void {
    console.log("Failure", _response);
  }
  
  function handleSuccess(_response: Response): void {
    console.log("Success", _response);
  }

  communicate("http://www.hs-furtwangen.de");
