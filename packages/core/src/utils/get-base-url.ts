export const getBackendBaseUrl = (production: boolean): URL => {
	return production ? new URL("https://pokepoke.up.railway.app") : new URL("http://localhost:8787");
};

export const getMobileBaseScheme = (): URL => {
	return new URL("pokepoke://");
};
