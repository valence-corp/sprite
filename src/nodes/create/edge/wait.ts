export function wait(time: number) {
  try {
    return `WAIT ${time}`;
  } catch (error) {
    throw new TypeError(`Could not set WAIT (time) on the command.`, {
      cause: error
    });
  }
}
