// /api/youtube.js (Next.js example)
export default async function handler(req, res) {
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
  