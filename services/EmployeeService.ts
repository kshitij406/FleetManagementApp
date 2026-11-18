export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    ".issued": string;
    ".expires": string;
}

const TOKEN_URL = process.env.EXPO_PUBLIC_TOKEN_URL;
const TOKEN_BODY = "username=" + encodeURIComponent(process.env.EXPO_PUBLIC_API_USERNAME || "") +
    "&password=" + encodeURIComponent(process.env.EXPO_PUBLIC_API_PASSWORD || "") +
    "&ClientId=" + encodeURIComponent(process.env.EXPO_PUBLIC_API_CLIENT_ID || "") +
    "&grant_type=password";

export const getAccessToken = async (): Promise<TokenResponse | null> => {
    try {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': "text/plain",
            },
            body: TOKEN_BODY,
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Token Response Data:\n", data);
        
        return data;
    } catch (error) {
        console.error("Failed to fetch access token:", error);
        return null;
    }
};

getAccessToken();