import type { NextApiRequest, NextApiResponse } from 'next';
import { publicEndpoint } from '@/lib/config';

const robotsTxt = `
User-agent: *

Allow: *
Disallow: /api/*

Sitemap: ${publicEndpoint}/wp-sitemap.xml
`.trim();

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
	const isGET = [ 'get', 'head' ].includes( req.method.toLowerCase() );
	if ( ! isGET ) {
		return res.status( 404 ).send( 'Not found' );
	}

	res.setHeader( 'content-type', 'text/plain' );

	return res.status( 200 ).send( robotsTxt );
}
