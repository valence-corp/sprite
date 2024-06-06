/**
 * Verifies that the actor propagates upstream errors
 * @param {Function} actor The function to check the return functionality of
 * @returns {Promise<void>}
 * @example
 * describe(...
 *   testPropagateErrros(server.restJson);
 * );
 */
export declare const testPropagateErrors: (actor: Function, params?: any) => void;
