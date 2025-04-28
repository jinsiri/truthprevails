import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const prefix =
	isProd ? '/truthprevails' : ''

const nextConfig: NextConfig = {
	output: isProd ? 'export' : undefined,
	basePath: prefix,
	assetPrefix: prefix,
};

export default nextConfig;

