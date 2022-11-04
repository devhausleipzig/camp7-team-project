const withRoutes = require("nextjs-routes/config")();

const requiredEnvVars = ["TOKEN_KEY", "DATABASE_URL"];

for (const requiredEnvVar of requiredEnvVars) {
	if (!process.env[requiredEnvVar]) {
		throw new Error(`Missing required env var: ${requiredEnvVar}`);
	}
}

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
