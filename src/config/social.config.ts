import { apiUrl } from "./app.config";

export const githubClientId = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const githubCallback = `${apiUrl}/auth/github`;