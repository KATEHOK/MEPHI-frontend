console.log('Hello World!')

// Установить с помощью npm библиотеку Axios
// и сделать get запрос к https://vk.com.

// Проделайте то же самое, что в предыдущем пункте, только запрос
// делайте на API geoiplookup.io (https://json.geoiplookup.io/).
// Объяснить полученные результаты.

const axios = require('axios')

axios.get('https://vk.com')
  .then(function (response) {console.log(response)})
  .catch(function (error) {console.log(error)})
  
axios.get('https://json.geoiplookup.io')
.then(function (response) {console.log(response)})
.catch(function (error) {console.log(error)})