// src: https://jsfiddle.net/seamusleahy/rxeuaatw/
var formEl = document.getElementById('form');

formEl.addEventListener('submit', function(event) {
  // 1. Setup the request
  // ================================
  // 1.1 Headers
  var headers = new Headers();
  // Tell the server we want JSON back
  headers.set('Accept', 'application/json');

  // 1.2 Form Data
  // We need to properly format the submitted fields.
  // Here we will use the same format the browser submits POST forms.
  // You could use a different format, depending on your server, such
  // as JSON or XML.
  var formData = new FormData();
  for (var i = 0; i < formEl.length; ++i) {
    formData.append(formEl[i].name, formEl[i].value);
  }
  formData.append("state",metric.state)
  formData.append("value",metric.value)
  // This is for the purpose of this demo using jsFiddle AJAX Request endpoint
  //  formData.append('json', JSON.stringify({example: 'return value'}));

  // 2. Make the request
  // ================================
  var url = 'https://enigmatic-tor-66377.herokuapp.com/new';
  var fetchOptions = {
    method: 'POST',
    headers,
    body: formData
  };
  // debugger;
  var responsePromise = fetch(url, fetchOptions);
  // 3. Use the response
  // ================================
  responsePromise
  // 3.1 Convert the response into JSON-JS object.
    .then(function(response) {
      return response.json();
    })
  // 3.2 Do something with the JSON data
    .then(function(jsonData) {
      console.log(jsonData);
      toastr.success("Thanks for logging today's score.")
      document.getElementById('results').innerText = JSON.stringify(jsonData);
    });
  

  event.preventDefault();
});
