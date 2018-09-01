
/**
 * 检查状态码
 * @param response
 * @returns {*}
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText || `statusCode: ${response.status}`);
  error.response = response;
  throw error;
};

const parseJSON = response =>
  response
    .json()
    .then(json => json)
    .catch(err => {
      throw err;
    });

/**
 * object转成url后的查询字符串
 * @param obj
 * @returns {string}
 */
const toQueryString = (obj = {}) => {
  const items = [];
  Object.keys(obj).forEach(key => {
    items.push(`${key}=${encodeURIComponent(obj[key])}`);
  });
  return items.length > 0 ? `?${items.join('&')}` : '';
};

 const post = (url, data={})=> {
    return fetch(url,{
      method: "POST",
      body:JSON.stringify(data),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(checkStatus)
      .then(parseJSON)
      .then(data => {
         if (__DEV__ && console.group) {
           console.group(`<-- ${url}`);
           console.log(data);
           console.groupEnd();
         }
         return data;
      })
      .catch(err=>{
        if (__DEV__ && console.group) {
          console.group(`<-- ${url}`);
          console.log(err);
          console.groupEnd();
        }
        throw err;
      });
 }

 const get = (url, data={})=>{
   const getUrl = url + toQueryString(data);
   return fetch(getUrl,{
     method: "GET",
     headers:{
       Accept: 'application/json',
       'Content-Type': 'application/json',
     }
   }).then(checkStatus)
     .then(parseJSON)
     .then(data => {
       if (__DEV__ && console.group) {
         console.group(`<-- ${url}`);
         console.log(data);
         console.groupEnd();
       }
       return data;
     })
     .catch(err=>{
       if (__DEV__ && console.group) {
         console.group(`<-- ${url}`);
         console.log(err);
         console.groupEnd();
       }
       throw err;
     });
 };


 export default {
   post: post,
   get: get,
 }