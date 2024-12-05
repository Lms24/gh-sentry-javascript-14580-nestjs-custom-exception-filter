import * as Sentry from '@sentry/nestjs';

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: 'https://2c14df29dd5684756df5689ee6f51296@o447951.ingest.us.sentry.io/4506699024826368',

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  debug: true,
  beforeSend(event) {
    console.log('event:', event);
    return event;
  },
});
