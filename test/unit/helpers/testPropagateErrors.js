"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPropagateErrors = void 0;
/**
 * Verifies that the actor propagates upstream errors
 * @param {Function} actor The function to check the return functionality of
 * @returns {Promise<void>}
 * @example
 * describe(...
 *   testPropagateErrros(server.restJson);
 * );
 */
const testPropagateErrors = (actor, params) => it('should propagate errors from internal methods', async () => {
    // Arrange
    jest
        .spyOn(global, 'fetch')
        .mockRejectedValueOnce(new TypeError('fetch failed'));
    // Assert & Act
    await expect(actor(params)).rejects.toMatchSnapshot();
});
exports.testPropagateErrors = testPropagateErrors;
//# sourceMappingURL=testPropagateErrors.js.map