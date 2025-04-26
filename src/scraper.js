import { Actor } from 'apify';
import { gotScraping } from 'got-scraping';
import { delay } from './utils.js';

const BASE_URL = 'https://console-backend.apify.com/public/store/memoized-search';


export class ScraperState {
    constructor(persistenceKey) {
        this.persistenceKey = persistenceKey;
        this.processedItems = [];
        this.currentOffset = 0;
        this.totalResults = 0;
        this.stats = { success: 0, failures: 0 };
    }

    async load() {
        const data = await Actor.getValue(this.persistenceKey) || {};
        Object.assign(this, data);
    }

    async save() {
        await Actor.setValue(this.persistenceKey, {
            processedItems: this.processedItems,
            currentOffset: this.currentOffset,
            totalResults: this.totalResults,
            stats: this.stats
        });
    }
}

export async function scrapeStore(input) {

    const PERSISTENCE_KEY = `SEARCH_STATE`;
    const state = new ScraperState(PERSISTENCE_KEY);
    await state.load();

    Actor.on('migrating', async () => {
        console.log(`Migration detected - saving state for "${input.search}"`);
        await state.save();
    });

    let hasMore = true;
    const itemsPerRequest = input.limit;
    const maxResults = input.maxResults;
    while (hasMore) {
        const remainingItems = maxResults > 0
            ? Math.max(0, maxResults - state.stats.success)
            : itemsPerRequest;

        const currentLimit = maxResults > 0
            ? Math.min(itemsPerRequest, remainingItems)
            : itemsPerRequest;

        if (maxResults > 0 && remainingItems <= 0) {
            console.log('Reached maximum requested results');
            break;
        }

        const params = {
            search: input.search || '',
            sortBy: input.sortBy || 'RELEVANCE',
            category: input.category || '',
            pricingModel: input.pricingModel || '',
            limit: currentLimit.toString(),
            offset: state.currentOffset.toString()
        };

        // Only add managedBy if it has a value
        if (input.managedBy) {
            params.managedBy = input.managedBy;
        }

        const url = `${BASE_URL}?${new URLSearchParams(params)}`;
        console.log(`Fetching ${currentLimit} items from offset ${state.currentOffset}...`);

        //await new Promise(r => setTimeout(r, 1000)); // for a debug

        try {
            const response = await gotScraping.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Referer': 'https://console.apify.com/',
                    'Origin': 'https://console.apify.com'
                },
                responseType: 'json'
            });

            const data = response.body;

            if (!data.items || !Array.isArray(data.items)) {
                console.error(`Failed to fetch batch at offset ${state.currentOffset}:`, error.message);
                throw new Error(`Invalid response format - missing items array ${state.currentOffset}`);
            }

            for (const item of data.items) {
                if (maxResults > 0 && state.stats.success >= maxResults) {
                    hasMore = false;
                    break;
                }

                try {
                    const itemData = {
                        id: item.id,
                        title: item.title,
                        url: `https://apify.com/${item.username}/${item.name}`,
                        username: item.username,
                        description: item.description,
                        categories: item.categories,
                        price: item.currentPricingInfo?.pricePerUnitUsd,
                        stats: {
                            totalRuns: item.stats?.totalRuns,
                            lastRun: item.stats?.lastRunStartedAt
                        }
                    };

                    await Actor.pushData(item);
                    state.stats.success++;
                } catch (error) {
                    console.error(`Failed to process item ${item.id}:`, error.message);
                    state.stats.failures++;
                }
            }

            state.currentOffset += data.items.length;
            await state.save();
            console.log(`Progress: ${state.stats.success} items fetched (${maxResults > 0 ? `${state.stats.success}/${maxResults}` : 'unlimited'})`);

            if (data.items.length < currentLimit ||
                (maxResults > 0 && state.stats.success >= maxResults)) {
                hasMore = false;
                console.log('Reached end condition');
            }

            if (input.batchDelay > 0 && hasMore) {
                await delay(input.batchDelay);
            }

        } catch (error) {
            state.stats.failures++;
            await state.save();
            console.error(`Failed to fetch batch at offset ${state.currentOffset}:`, error.message);
            throw error;
        }
    }

    await Actor.setValue(PERSISTENCE_KEY, null);
    return {
        stats: state.stats
    };
}