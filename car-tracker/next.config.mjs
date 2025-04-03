import pkg from "next";
const { NextConfig } = pkg

/** @type {NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    images: {
        domains: ["firebasestorage.googleapis.com"], // Allow images from Firebase Storage
    },
};

export default nextConfig;