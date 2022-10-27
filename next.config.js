const withRoutes = require("nextjs-routes/config")();

module.exports = withRoutes({
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	},
	pageExtensions: ["tsx", "ts", ""]
});
