import Event from "./base-event";

const subscribers: { [key: string]: Function[] } = {};

/**
 * Subscribe to an Event.
 * @param name name of the event (use Event.eventName)
 * @param callback
 */
function subscribe<TEvent extends Event>(
  name: string,
  callback: (event: TEvent) => void
): void {
  if (!subscribers[name]) subscribers[name] = [];
  subscribers[name].push(callback);
}

/**
 * Emit an event, calling all subscribers of that event.
 * @param event
 */
function emit(event: Event): void {
  const name = event.eventName;

  if (subscribers[name]) {
    subscribers[name].forEach(callback => {
      callback(event);
    });
  }
}

export { emit, subscribe };
