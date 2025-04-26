import { Actor } from 'apify';
import { scrapeStore } from './scraper.js';

const STATE_KEY = 'SEARCH_PROGRESS';

await Actor.init();

const input = await Actor.getInput() ?? {};
const searchTerms = input.search || [];

if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
    throw new Error('Input must include a non-empty "search" array.');
}

let progress = await Actor.getValue(STATE_KEY) ?? {
    remainingTerms: [...searchTerms],
    completedTerms: [],
    perSearchStats: {}
};

Actor.on('migrating', async () => {
    console.log('🚨 Migration triggered, saving queue state...');
    await Actor.setValue(STATE_KEY, progress);
    await Actor.reboot();
});

try {
    while (progress.remainingTerms.length > 0) {
        const term = progress.remainingTerms.shift();
        console.log(`\n🔍 Searching for: "${term}"`);

        const queryInput = {
            ...input,
            search: term,
        };

        try {
            const result = await scrapeStore(queryInput);

            progress.perSearchStats[term] = result.stats;
            progress.completedTerms.push(term);
        } catch (error) {
            console.error(`❌ Failed to process term "${term}", re-adding to queue.`);
            progress.remainingTerms.push(term);
        }

        await Actor.setValue(STATE_KEY, progress);
    }

    console.log('\n✅ All searches completed!');
    console.log('📊 Final stats:', progress.perSearchStats);

    await Actor.setValue('SUMMARY', progress.perSearchStats);
    await Actor.setValue(STATE_KEY, null);
} catch (err) {
    console.error('❌ Scraping failed:', err);
    await Actor.fail(err);
} finally {
    await Actor.exit();
}