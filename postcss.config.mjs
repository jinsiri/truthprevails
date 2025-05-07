const config = {
	plugins: {
		'@tailwindcss/postcss': {},
		'postcss-url': [
			{
				url: ({ url }) => {
					if (url.startsWith('/images')) {
						const basePath = process.env.NODE_ENV === 'production' ? '/truthprevails' : '';
						return basePath + url;
					}
					return url;
				},
			},
		],
	},
};

export default config;
