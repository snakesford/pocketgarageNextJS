import { NextResponse } from "next/server";
import { cars } from "@/data/cars";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim().toLowerCase();

    const results = cars.filter((car) => {
        return (
            car.make.toLowerCase().includes(query) ||
            car.model.toLowerCase().includes(query) ||
            String(car.year).includes(query) ||
            car.type.toLowerCase().includes(query) ||
            car.fuel.toLowerCase().includes(query) ||
            car.transmission.toLowerCase().includes(query)
        );
    });

    return NextResponse.json(results);
}








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