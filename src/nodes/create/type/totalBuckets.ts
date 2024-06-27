export function totalBuckets(totalNumberOfBuckets: number) {
  try {
    return `BUCKETS ${totalNumberOfBuckets}`;
  } catch (error) {
    throw new Error(
      `Could not generate BUCKETS (total number of buckets) node, recieved: ${totalNumberOfBuckets}`,
      { cause: error }
    );
  }
}
