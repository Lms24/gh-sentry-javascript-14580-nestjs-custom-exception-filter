import { captureException } from '@sentry/nestjs';

/**
 * A decorator to wrap user-defined exception filters and add Sentry error reporting.
 *
 * taken from @sentry/nestjs for faster debugging
 */
export function SentryExceptionCaptured() {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('xx SentryExceptionCaptured', target, propertyKey, descriptor);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalCatch = descriptor.value as (
      exception: unknown,
      host: unknown,
      ...args: any[]
    ) => void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (
      exception: unknown,
      host: unknown,
      ...args: any[]
    ) {
      if (isExpectedError(exception)) {
        console.log('xx is expected error', exception);
        return originalCatch.apply(this, [exception, host, ...args]);
      }

      console.log('xx calling captureException', exception);
      captureException(exception);
      return originalCatch.apply(this, [exception, host, ...args]);
    };

    return descriptor;
  };
}

export function isExpectedError(exception: unknown): boolean {
  if (typeof exception === 'object' && exception !== null) {
    return 'status' in exception || 'error' in exception;
  }
  return false;
}

export class CustomException extends Error {
  constructor(message: string) {
    super(message);
  }
}
