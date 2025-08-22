import { NextResponse } from "next/server";
import cars_converted from "@/data/cars_converted.json";



export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase();

    const results = cars_converted.filter((car) => {
        return (
            car.make?.toLowerCase().includes(query) ||
            car.model?.toLowerCase().includes(query) ||
            String(car.year || "").includes(query) ||
            car.type?.toLowerCase().includes(query) ||
            car.fuel?.toLowerCase().includes(query) ||
            car.transmission?.toLowerCase().includes(query)
        );
    });
    return NextResponse.json(results);
}





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