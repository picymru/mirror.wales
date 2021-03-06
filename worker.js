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
  if (host.includes(PRODUCT_NAME) == false) {
    return new Response(`You requested an invalid host. Please visit our website at ${PRODUCT_NAME}`, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  // Now, for the main website
  if (host == PRODUCT_NAME) {
    return new Response(`Welcome to mirror.wales`, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  // Now we fetch the subdomain from the host, if it's a subdomain
  let product = host.replace(`.${PRODUCT_NAME}`, '')

  // And load the configuration so we can find out how to handle the request
  let config = await mirrors.get('mirrors')
  if (config === null) {
    return new Response(`We are unable to handle your request at present due to a configuration issue. Please try again later`, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  config = JSON.parse(config)
  try {
    var endpoint = config[product]['endpoint']
  }
  catch (e) {
    return new Response(`You tried to access a mirror we don't yet maintain. Please send your request to feedback@mirror.wales`, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  // And now to perform the fetch
  let lastSegment = path.substring(path.lastIndexOf('/'))
  if (lastSegment.indexOf('.') === -1)
    path += '/'

  return fetch(`${endpoint}${path}`, {
    headers: {
      'User-Agent': config[product]['user-agent']
    },
    cf: {
      cacheTtlByStatus: {
        "200-299": 86400,
        404: 1,
        "500-599": 0
      }
    }
  })
}