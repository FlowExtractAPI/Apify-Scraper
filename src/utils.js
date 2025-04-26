export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function validateInput(input) {
    if (input.limit && (input.limit < 1 || input.limit > 100)) {
        throw new Error('Limit must be between 1 and 100');
    }
    if (input.batchDelay && input.batchDelay < 0) {
        throw new Error('Batch delay must be a positive number');
    }
    if (input.maxResults && input.maxResults < 0) {
        throw new Error('Max results must be a positive number');
    }
    if (input.minRating && (input.minRating < 0 || input.minRating > 5)) {
        throw new Error('Minimum rating must be between 0 and 5');
    }
}