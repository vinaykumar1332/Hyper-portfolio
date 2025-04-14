export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const category = req.query.category || "28";

  const apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&videoCategoryId=${category}&maxResults=10&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
