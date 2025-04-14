// /api/youtube.js (Next.js example)
export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin (or specify your local origin here)
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (or specify 'http://127.0.0.1:5501' for local development)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const query = req.query.q || 'technology';
  // Use the search endpoint rather than the videos endpoint:
  const apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}
