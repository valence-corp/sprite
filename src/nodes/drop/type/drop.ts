export function drop<N>(typeName: N) {
  try {
    return `DROP TYPE ${typeName as string}`;
  } catch (error) {
    throw new TypeError(`Could not set DROP TYPE on the command.`, {
      cause: error
    });
  }
}
