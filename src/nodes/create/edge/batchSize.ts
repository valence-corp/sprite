export function batchSize(batchSize: number) {
  try {
    //validation.integer(batchSize);
    return `BATCH ${batchSize}`;
  } catch (error) {
    throw new TypeError(
      `Could not validate parameter 'batchSize' to set BATCH on the command.`,
      { cause: error }
    );
  }
}
