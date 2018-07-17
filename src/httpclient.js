
class HttpClient {
  static get(url, headerOptions) {
    return fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: headerOptions,
      mode: 'cors',
    }).then((res) => {
      // promise
      return new Promise((resolve, reject) => {
        if (res.ok) {
          console.log(`Response Status: ${res.status}`);
          resolve(res.json());
        } else {
          reject(new Error(res.statusText));
        }
      });
    });
  }

  static post(url, body, headerOptions) {
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(body),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: headerOptions,
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }
}

export default HttpClient;