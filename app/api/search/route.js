// app/api/search/route.js
import { NextResponse } from "next/server";
import cars_converted from "@/data/vehiclesSample.json";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    let results = cars_converted;

    if (query) {
        results = results.filter((car) =>
            car.make?.toLowerCase().includes(query) ||
            car.model?.toLowerCase().includes(query) ||
            String(car.year || "").includes(query) ||
            car.type?.toLowerCase().includes(query) ||
            car.fuel?.toLowerCase().includes(query) ||
            car.transmission?.toLowerCase().includes(query)
        );
    }

    // Apply pagination (just slice out what we need)
    const paginated = results.slice(offset, offset + limit);

    return NextResponse.json({
        results: paginated,
        total: results.length, // so frontend knows how many exist
    });
}

// import { NextResponse } from "next/server";
// import vehiclesSample from "@/data/vehiclesSample.json";


// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("q")?.toLowerCase();
//     const limit = parseInt(searchParams.get("limit") || "100", 10);
//     const offset = parseInt(searchParams.get("offset") || "0", 10);
//     if (query) {
//         results = vehiclesSample.filter((car) => {
//             car.make?.toLowerCase().includes(query) ||
//                 car.model?.toLowerCase().includes(query) ||
//                 String(car.year || "").includes(query) ||
//                 car.type?.toLowerCase().includes(query) ||
//                 car.fuel?.toLowerCase().includes(query) ||
//                 car.transmission?.toLowerCase().includes(query)
//         });
//     }
//     return NextResponse.json(results);
// }

// import { NextResponse } from "next/server";
// import cars_converted from "@/data/cars_converted.json";
// import vehiclesSample from "@/data/vehiclesSample.json";



// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("q")?.toLowerCase();

//     const results = vehiclesSample.filter((car) => {
//         return (
//             car.make?.toLowerCase().includes(query) ||
//             car.model?.toLowerCase().includes(query) ||
//             String(car.year || "").includes(query) ||
//             car.type?.toLowerCase().includes(query) ||
//             car.fuel?.toLowerCase().includes(query) ||
//             car.transmission?.toLowerCase().includes(query)
//         );
//     });
//     return NextResponse.json(results);
// }


// Multi-search 
// Using smaller dataset - cars_converted.json
// Search:
// acura ra 20 a a a a a 
// Results:
// Acura Integra (2025)
// Acura Integra (2025)
// Acura Integra A-Spec (2025)
// Acura Integra A-Spec (2025)
// Acura MDX AWD (2025)
// Acura MDX AWD Type-S (2025)
// Acura MDX FWD (2025)
// Acura RDX AWD (2025)
// Acura RDX AWD A-SPEC (2025)
// Acura TLX AWD A-SPEC (2025)
// Acura TLX FWD (2025)
// Acura TLX Type-S (2025)

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("q")?.toLowerCase();

//     const terms = query.split(/\s+/);
//     const results = cars_converted.filter((car) => {

//         return terms.every(term =>
//             car.make?.toLowerCase().includes(term) ||
//             car.model?.toLowerCase().includes(term) ||
//             String(car.year || "").includes(term) ||
//             car.type?.toLowerCase().includes(term) ||
//             car.fuel?.toLowerCase().includes(term) ||
//             car.transmission?.toLowerCase().includes(term)
//         );
//     });
//     return NextResponse.json(results);
// }



// import { cars } from "@/data/cars";
/*
"year":2025,
    "make":"Acura",
    "model":"Integra",
    "atvType":null,
    "baseModel":"Integra",
    "VClass":"Large Cars",
    "cylinders":4.0,
    "displ":1.5,
    "drive":"Front-Wheel Drive",
    "fuelType":"Premium",
    "phevBlended":false,
    "range":0,
    "trany":"Automatic (AV-S7)",
    "UCity":39.4,
    "UCityA":0.0,
    "UHighway":54.8,
    "fuelType2":null,
    "rangeA":null,
    "evMotor":null
    */

// const results = cars_converted.filter((car) => {
//     const haystack = [
//         car.make,
//         car.model,
//         car.year,
//         car.type,
//         car.fuel,
//         car.transmission,
//     ]
//         .filter(Boolean)          // drop undefined/null
//         .map(String)              // ensure strings
//         .join(" ")                // join with single spaces (no newlines)
//         .toLowerCase()
//         .replace(/\s+/g, " ");    // normalize any extra whitespace

//     return haystack.includes(query);
// });


// import { NextResponse } from "next/server";

// // Sample car data
// const cars = [
//     { make: "Honda", model: "Civic", year: 2020 },
//     { make: "Toyota", model: "Camry", year: 2021 },
//     { make: "Ford", model: "Mustang", year: 2019 },
//     { make: "Audi", model: "RS6", year: 2026 },
// ];

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q")?.trim().toLowerCase();

//     let results = cars;

//     results = cars.filter(car =>
//         [car.make, car.model, car.year.toString()]
//             .some(field => field.toLowerCase().includes(q))
//     );

//     return NextResponse.json(results);
// }










// import { NextResponse } from "next/server";
// import { cars } from "@/data/cars";

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("q")?.toLowerCase() || "";
//     if (!query) {
//         console.log('Query is empty');
//     }
//     const results = cars.filter((car) => {
//         return (
//             car.make.toLowerCase().includes(query) ||
//             car.model.toLowerCase().includes(query) ||
//             String(car.year).includes(query) ||
//             car.type.toLowerCase().includes(query) ||
//             car.fuel.toLowerCase().includes(query) ||
//             car.transmission.toLowerCase().includes(query)
//         );
//     });

//     return NextResponse.json(results);
// }










// import { Client } from '@elastic/elasticsearch';

// const client = new Client({ node: 'http://localhost:9200' }); // Change to hosted OpenSearch/Elastic

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query") || "";

//     const result = await client.search({
//         index: 'cars',
//         query: {
//             multi_match: {
//                 query,
//                 fields: ['make', 'model', 'type'],
//             },
//         },
//     });

//     return Response.json(result.hits.hits.map(hit => hit._source));
// }