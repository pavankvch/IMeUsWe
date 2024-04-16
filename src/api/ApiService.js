
export const Server = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    path: '',
  };
  
  export const URLConstants = {
    API: Server.baseURL,
  };

  export const EndPoints = {
    guide: '/guide/',

  };
  

  export function promiseHandler(promise) {
    return promise
      .then(data => [data, null])
      .catch(error => Promise.resolve([null, error]));
  }


export async function sendFeedback(formDataReq) {
  
    var requestOptions = {
      method: "POST",
      body: formDataReq,
      redirect: "follow",
    };
    console.log(`request ${JSON.stringify(requestOptions)}`);
    try {
      const response = await fetch(
        `${URLConstants.API}${EndPoints.guide}`,
        requestOptions
      );
      console.log(
        ` response, ${response.ok}, status, ${response.status}`
      );

      let json = await response.json();
  
      if (!response.ok && response.status === 415) {
        // return;
      }
      if (json.status === 200 || json.statusCode === 200) {
        return json;
      } else if(response.status === 404){
        return "success";
      }else {
        return Promise.reject(json);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }