addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {

  const PRODUCT_NAME = "mirror.wales"

  let host = new URL(request.url).host
  let path = new URL(request.url).pathname;

  // Now we do some syntax checking to ensure the host is valid
  if (host.includes(`.${PRODUCT_NAME}`) == false) {
    return new Response(`You requested an invalid host. Please visit our website at ${PRODUCT_NAME}`, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  // Now we fetch the subdomain from the host
  let product = host.replace(`.${PRODUCT_NAME}`, '')
  return new Response(product, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}