# 🔍 Apify Scraper

## ✨ Overview
Apify Store Scraper is a powerful actor for extracting comprehensive data from the Apify Store marketplace. Whether you need to research available actors, monitor pricing changes, or gather insight[...]

## 📊 What Can It Scrape?

The Apify Store Scraper extracts detailed information from actor listings, including:

- **📝 Basic Information**: Title, ID, URL, description, name
- **👤 Developer Details**: Username, user full name, profile picture URL
- **📈 Statistics**: Total runs, users, builds, and performance metrics
- **🏷️ Categorization**: Categories, tags, and management type (Apify Official or Community)
- **⭐ Ratings & Popularity**: Review ratings, bookmark counts
- **💰 Pricing Information**: Pricing model, cost per unit, trial periods

## 🚀 Features

- **🔄 Multi-Query Support**: Process multiple search terms in a single run
- **💾 State Persistence**: Automatically save progress and resume after migrations or failures
- **🔍 Configurable Filtering**: Filter by search terms, categories, pricing models, and more
- **⏱️ Intelligent Rate Limiting**: Configurable delays between requests to respect server limits
- **📄 Result Pagination**: Handles all result pages automatically for complete data collection
- **⚙️ Customizable Output**: Control exactly what data you want to collect

## 🛠️ Usage

### Input Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | Array | List of search terms to process sequentially |
| `sortBy` | String | How to sort results: relevance, popularity, newest, or lastUpdate |
| `category` | String | Filter by specific category (AI, Social Media, E-commerce, etc.) |
| `pricingModel` | String | Filter by pricing type (Free, Pay Per Result, Monthly Rental, etc.) |
| `managedBy` | String | Filter by developer type (Apify Official or Community) |
| `limit` | Number | Items per request (max 100) |
| `maxResults` | Number | Maximum total results to fetch (0 for unlimited) |
| `batchDelay` | Number | Milliseconds to wait between API requests |

### Example Input

```json
{
  "search": ["YouTube Scraper", "github", "e-commerce"],
  "sortBy": "popularity",
  "category": "SOCIAL_MEDIA",
  "pricingModel": "",
  "managedBy": "",
  "limit": 24,
  "maxResults": 100,
  "batchDelay": 100
}
```

### Example Output

```json
{
  "id": "y1IMcEPawMQPafm02",
  "title": "Youtube Video Downloader",
  "url": "https://apify.com/epctex/youtube-video-downloader",
  "username": "epctex",
  "description": "Effortlessly download YouTube videos of your preferred quality with our user-friendly Video Downloader. Try it now!",
  "categories": ["VIDEOS", "SOCIAL_MEDIA", "AUTOMATION"],
  "price": 30,
  "stats": {
    "totalRuns": 246731,
    "lastRun": "2025-04-25T09:03:27.155Z"
  }
}
```

## 💡 Use Cases

- **🔎 Market Research**: Analyze available actors in specific niches
- **👀 Competitor Analysis**: Monitor pricing models and popularity trends
- **🛠️ Tool Discovery**: Find the most effective actors for your specific needs
- **📊 Performance Monitoring**: Track statistics and user ratings over time
- **🔌 Integration Planning**: Gather data for making informed decisions about which actors to use in your projects

## 🤔 Why Scrape the Apify Store?

The Apify Store is a growing marketplace for web scraping and automation tools. By extracting data systematically, you can:

1. **🧠 Make Informed Decisions**: Compare actors based on performance metrics and user ratings
2. **🔄 Stay Updated**: Monitor new actors and updates to existing ones
3. **⏱️ Save Time**: Quickly filter through thousands of options to find exactly what you need
4. **📈 Analyze Trends**: Track changes in pricing, popularity, and feature sets over time

## 🚀 Getting Started

1. **Click "Try for free"** or use your existing Apify account
2. **Set your input parameters** to customize your search
3. **Run the actor** and wait for it to complete
4. **View your results** in the Dataset tab or download as JSON, CSV, or Excel

## 🔧 Advanced Usage

### 🔄 Resuming Failed Runs

The actor features built-in state persistence. If a run fails or gets migrated, it will automatically resume from where it left off, saving you time and resources.

### 🔍 Multiple Search Terms

Use the `search` array to process multiple queries in a single run. Each term will be processed sequentially, with results combined in the final dataset.

### ⏱️ Rate Limiting

The `batchDelay` parameter helps you control how aggressively the actor makes requests. Higher values are more conservative but slower, while lower values are faster but may increase the risk of [...]

## ⚠️ Limitations

- The actor only extracts publicly available information from the Apify Store
- Request rates are limited to respect Apify's servers
- Some detailed actor statistics may not be available for all listings

## 📦 Open Source

This actor is open source! Feel free to:

- 🔧 Fork and modify it to suit your specific needs
- 🐛 Submit bug reports and feature requests
- 🤝 Contribute improvements or optimizations
- 🌐 Share with others who might benefit from it

Check out the [GitHub repository](https://github.com/FlowExtractAPI/Apify-Scraper) for the latest code and updates.

## 💬 Support & Contact

### Get Help

- 🌐 **Website**: [flowextractapi.com](https://flowextractapi.com)
- 📧 **Email**: [flowextractapi@outlook.com](mailto:flowextractapi@outlook.com)
- 🙋 **Apify Profile**: [FlowExtract API](https://apify.com/dz_omar?fpr=smcx63)
- 💬 **GitHub Issues**: [FlowExtractAPI](https://github.com/FlowExtractAPI)

### Social Media

- 💼 **LinkedIn**: [flowextract-api](https://www.linkedin.com/in/flowextract-api/)
- 🐦 **X**: [@FlowExtractAPI](https://x.com/FlowExtractAPI)
- 📱 **Facebook**: [flowextractapi](https://www.facebook.com/flowextractapi)
- 🎵 **TikTok**: [@flowextractapi](https://www.tiktok.com/@flowextractapi)
