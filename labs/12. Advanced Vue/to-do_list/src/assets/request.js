const axios = require('axios')

export const request = axios.get('https://vk.com')
  .then(function (response) {console.log(response)})
  .catch(function (error) {console.log(error)})