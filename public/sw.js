// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', () => self.skipWaiting());

const ignore = { image: 1, audio: 1, video: 1, style: 1, font: 1 };

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (e) => {
  const { request, clientId } = e;
  const { destination } = request;
  if (!clientId || ignore[destination]) {
    return;
  }
  e.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    self.clients.get(clientId).then(client =>
      client?.postMessage({
        fetchUrl: request.url,
        dest: destination,
      }),
    ),
  );
});
