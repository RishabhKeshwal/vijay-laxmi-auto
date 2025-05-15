import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import vehiclesData from "@/constants";

export async function generateStaticParams() {
    return vehiclesData.map((vehicle) => ({
        slug: vehicle.slug,
    }));
}

const VehicleDetails = ({ params }: { params: { slug: string } }) => {
    const vehicle = vehiclesData.find((v) => v.slug === params.slug);

    if (!vehicle) return notFound();

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">{vehicle.name}</h1>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicle.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${vehicle.name} ${index}`}
                        className="w-full h-56 object-cover rounded-xl"
                    />
                ))}
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                    <p><strong>Brand:</strong> {vehicle.brand}</p>
                    <p><strong>Category:</strong> {vehicle.category}</p>
                    <p><strong>Price:</strong> {vehicle.price}</p>
                    <p><strong>Mileage:</strong> {vehicle.mileage}</p>
                    <p><strong>Colors:</strong> {vehicle.colors.join(", ")}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Technical Specs:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {Object.entries(vehicle.technical_specs).map(([key, val]) => (
                            <li key={key}>
                                <strong className="capitalize">{key.replace("_", " ")}:</strong> {val}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Features */}
            <div>
                <h3 className="font-semibold text-lg mb-2">Key Features:</h3>
                <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feat, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                        >
                            {feat}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
