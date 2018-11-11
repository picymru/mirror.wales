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
  path = new URL(request.url).pathname;

  return new Response('Welcome to mirror.wales', {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}