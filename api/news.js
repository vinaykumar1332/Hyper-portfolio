// api/news.js
export default async function handler(req, res) {
    try {
      // CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
      const apiKey = process.env.NEWS_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing NEWS_API_KEY" });
      }
  
      const apiUrl = `https://newsapi.org/v2/everything?q=software+development+technology&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (err) {
      console.error("API Error:", err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
  