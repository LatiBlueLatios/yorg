import LZString from "../global/lzstring.js";

const API_HOST = "https://v2.yorg.io";

class OnlineAPI {
    constructor(root) {
        this.root = root;
    }

    async getCurrentLeaderboard(gameId, playerId, gameMode, successCallback, errorCallback) {
        this.get("/highscore/current", { GameId: gameId, PlayerId: playerId, GameMode: gameMode }, successCallback, errorCallback);
    }

    async getPermanentLeaderboard(successCallback, errorCallback) {
        this.get("/highscore/total", {}, successCallback, errorCallback);
    }

    async registerGame(data, successCallback, errorCallback) {
        this.post("/game/create", data, successCallback, errorCallback);
    }

    async updateGame(gameId, status, successCallback, errorCallback) {
        const data = { GameId: gameId, Status: status };
        this.post("/game/update", data, successCallback, errorCallback);
    }

    async post(endpoint, data, successCallback, errorCallback) {
        const compressedData = LZString.compressToUTF16(JSON.stringify(data));

        try {
            const response = await fetch(`${API_HOST}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: compressedData,
            });

            await this.handleResponse(endpoint, response, successCallback, errorCallback);
        } catch (error) {
            console.warn("[API] Error during POST request:", error);
            errorCallback();
        }
    }

    async get(endpoint, params, successCallback, errorCallback) {
        params.cacheKey = new Date().getTime();

        try {
            const response = await fetch(`${API_HOST}${endpoint}?${new URLSearchParams(params)}`);
            await this.handleResponse(endpoint, response, successCallback, errorCallback);
        } catch (error) {
            console.warn("[API] Error during GET request:", error);
            errorCallback();
        }
    }

    async handleResponse(endpoint, response, successCallback, errorCallback) {
        console.log("[API] Sending request to", endpoint);

        if (!response.ok) {
            console.warn(`[API] Invalid status code: ${response.status}`);
            errorCallback();
            return;
        }

        try {
            const data = await response.json();
            successCallback(data, response);
        } catch (error) {
            console.warn("[API] Invalid JSON response:", error);
            errorCallback();
        }
    }

    makeCacheSuffix() {
        return `?${new Date().getTime()}`;
    }
}

export default OnlineAPI;