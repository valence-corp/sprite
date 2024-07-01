export function retry(attempts: number) {
  try {
    return `RETRY ${attempts}`;
  } catch (error) {
    throw new TypeError(
      `Unable to set RETRY [attempts] on the CREATE EDGE command. `,
      {
        cause: error
      }
    );
  }
}
