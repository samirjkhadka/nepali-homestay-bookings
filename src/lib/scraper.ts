import axios from "axios";
import * as cheerio from "cheerio";

export async function getLatestNews() {
  try {
    const { data } = await axios.get("https://homestaykhabar.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const $ = cheerio.load(data);
    const articles: any[] = [];

    // Note: You must inspect the site to find the exact CSS selectors.
    // Usually news sites use classes like .post-item or .entry-title
    $(".post-item").each((i, el) => {
      if (i < 6) {
        // Limit to 6 latest news cards
        articles.push({
          title: $(el).find(".entry-title").text().trim(),
          link: $(el).find("a").attr("href"),
          image: $(el).find("img").attr("src"),
          excerpt: $(el).find(".entry-excerpt").text().trim(),
        });
      }
    });

    return articles;
  } catch (error) {
    console.error("Scraping failed", error);
    return [];
  }
}
