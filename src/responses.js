const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  console.dir(object);
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${object.message}</message>`;
  if (response.id) {
    responseXML = `${responseXML} <id>${object.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;

  response.write(responseXML);
  console.dir(responseXML);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseMessage = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseMessage);
  }
  return respondJSON(request, response, 200, responseMessage);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseMessage = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseMessage.message = 'Missing valid query parameter set equal to true';
    responseMessage.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      return respondXML(request, response, 400, responseMessage);
    }

    return respondJSON(request, response, 400, responseMessage);
  }

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseMessage);
  }

  return respondJSON(request, response, 200, responseMessage);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseMessage = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseMessage.message = 'Missing loggedIn query parameter set equal to true';
    responseMessage.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      return respondXML(request, response, 401, responseMessage);
    }

    return respondJSON(request, response, 401, responseMessage);
  }

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseMessage);
  }

  return respondJSON(request, response, 200, responseMessage);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseMessage = {
    message: 'This is a forbidden response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 403, responseMessage);
  }

  return respondJSON(request, response, 403, responseMessage);
};

const internal = (request, response, acceptedTypes) => {
  const responseMessage = {
    message: 'This is an internal response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 500, responseMessage);
  }

  return respondJSON(request, response, 500, responseMessage);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseMessage = {
    message: 'This is a notImplemented response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 501, responseMessage);
  }

  return respondJSON(request, response, 501, responseMessage);
};

const notFound = (request, response, acceptedTypes) => {
  const responseMessage = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 404, responseMessage);
  }

  return respondJSON(request, response, 404, responseMessage);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
