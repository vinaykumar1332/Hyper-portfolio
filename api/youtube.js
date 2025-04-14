export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin (or specify your local origin here)
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (or specify 'http://127.0.0.1:5501' for local development)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers
  
  // If this is an OPTIONS request, just return status 200
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;  // Ensure to set your YouTube API key in the environment variables
  const query = req.query.q || 'technology';  // Default query is 'technology' if no query is provided

  // Construct the YouTube search API URL
  const apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`;

  try {
    // Fetch data from YouTube API
    const response = await fetch(apiURL);
    const data = await response.json();

    // If no videos are found, send an empty array
    if (!data.items || data.items.length === 0) {
      res.status(200).json([]);
      return;
    }

    // Return the fetched data
    res.status(200).json(data);
  } catch (error) {
    // In case of an error, send a 500 error response
    console.error("Error fetching YouTube data:", error);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}
