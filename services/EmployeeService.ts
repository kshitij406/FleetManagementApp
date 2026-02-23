export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    ".issued": string;
    ".expires": string;
}

const TOKEN_URL = "http://cube.splendidtechone.com:41053/PCZMApi/token";

export const getAccessToken = async (): Promise<TokenResponse | null> => {
    try {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': "text/plain",
            },
            body: "username=admin2&password=admin2&ClientId=1111&grant_type=password",
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