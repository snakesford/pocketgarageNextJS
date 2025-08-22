import { Client } from '@elastic/elasticsearch';
import carsConverted from './cars_converted.json' with { type: "json" };
console.log(carsConverted[0]);
const client = new Client({ node: 'http://localhost:9200' });

async function run() {
    const indexName = "cars";

    // Create index if it doesn’t exist
    const exists = await client.indices.exists({ index: indexName });
    if (!exists) {
        await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        make: { type: "text" },
                        model: { type: "text" },
                        year: { type: "integer" },
                        type: { type: "keyword" },
                    },
                },
            },
        });
    }

    // Bulk insert JSON data
    const body = carsConverted.flatMap(doc => [
        { index: { _index: indexName } },
        doc
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
        console.error("❌ Errors while seeding:", bulkResponse.errors);
    } else {
        console.log("✅ Cars seeded into Elasticsearch!");
    }
}

run().catch(console.error);