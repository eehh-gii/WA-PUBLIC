const fetch = require('node-fetch'); // Import node-fetch

const baseURL = 'https://api.psychopumpum.fun/';
let apiKey = 'API-KEY'; // Replace with your API key

const getWeb = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

const shortLink = (url) => {
    const encodedUrl = encodeURIComponent(url);
    const apiEndpoint = `http://tinyurl.com/api-create.php?url=${encodedUrl}`;
    return new Promise((resolve, reject) => {
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) {
                    reject(new Error(`HTTP error! Status: ${response.status}`));
                    return;
                }
                return response.text();
            })
            .then(shortUrl => {
                resolve(shortUrl);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Utility function for URL encoding
const urlEncode = (baseURL, path, params) => {
    const url = new URL(baseURL + path);
    if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    return url.toString();
};

// Generic GET request function
const get = async (path, params) => {
    const fullUrl = urlEncode(baseURL, path, params);
    const headers = { 'Authorization': apiKey };
    console.log(fullUrl)

    try {
        const response = await fetch(fullUrl, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message }; // or handle error as needed
    }
};

// API functions
const chatOpenAi = (text) => get('openai/', { 'q': text });
const facebookDownload = (url) => get('facebook/download/', { 'url': url });
const instagramProfile = (username) => get('instagram/profile/', { 'username': username });
const instagramPost = (url) => get('instagram/post/', { 'url': url });
const instagramStory = (url) => get('instagram/story/', { 'url': url });
const tikTokProfile = (username) => get('tiktok/profile/', { 'username': username });
const tikTokDownload = (url) => get('tiktok/download/', { 'url': url });
const pinterestDownload = (url) => get('pinterest/download/', { 'url': url });
const pinterestSimilar = (url) => get('pinterest/similar/', { 'url': url });
const pinterestSearch = (q) => get('pinterest/search/', { 'q': q });
const youTubeDownload = (url) => get('youtube/download/', { 'url': url });
const youTubeSearch = (q, maxResult = '5') => get('youtube/search/', { 'q': q, 'maxResult': maxResult });
const redTubeSearch = (q) => get('redtube/search/', { 'q': q });
const redTubeDownload = (url) => get('redtube/download/', { 'url': url });
const pornHubSearch = (q, page = '1') => get('pornhub/search/', { 'q': q, 'page': page });
const pornHubDownload = (url) => get('pornhub/download/', { 'url': url });
const twitterProfile = (username) => get('twitter/profile/', { 'username': username });
const twitterDownload = (url) => get('twitter/download/', { 'url': url });
const lineVoom = (url) => get('line/voom/info/', { 'url': url });
const loginWithQrCode = (appType) => get('line/login/qrcode/', { 'appType': appType.toUpperCase() });
const loginPinCode = (session) => get('line/login/pincode/', { 'session': session });
const loginGetToken = (session) => get('line/login/token/', { 'session': session });
const loginWithCredential = (email, pwd, appType) => get('line/login/credential/', {
    'email': email,
    'password': pwd,
    'appType': appType.toUpperCase()
});
const primaryToSecondary = (authToken, appType) => get('line/primary/secondary/', {
    'authToken': authToken,
    'appType': appType.toUpperCase()
});
const smuleProfile = (username) => get('smule/profile/', { 'username': username });
const smuleDownload = (url) => get('smule/download/', { 'url': url });
const bmkg = () => get('bmkg/info/', {});
const animeSearch = (query) => get('anime/info/', { 'q': query });
const phraseSearch = (query) => get('phrase/search/', { 'q': query });
const randomName = (country, count) => get('random/name/', {
    'country': country,
    'count': count
});

module.exports = {
    chatOpenAi,
    facebookDownload,
    instagramProfile,
    instagramPost,
    instagramStory,
    tikTokProfile,
    tikTokDownload,
    pinterestDownload,
    pinterestSimilar,
    pinterestSearch,
    youTubeDownload,
    youTubeSearch,
    redTubeSearch,
    redTubeDownload,
    pornHubSearch,
    pornHubDownload,
    twitterProfile,
    twitterDownload,
    lineVoom,
    loginWithQrCode,
    loginPinCode,
    loginGetToken,
    loginWithCredential,
    primaryToSecondary,
    smuleProfile,
    smuleDownload,
    bmkg,
    animeSearch,
    phraseSearch,
    randomName,
    shortLink,
    getWeb
};
