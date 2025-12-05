# Sik

A personal API-first platform for SERP scraping and workflow automation using alternative search engines. Built to run lightweight request-based scrapers without browser automation, and includes pre-built n8n workflows for automation tasks.

---

## Features

- API-first server using [Hono](https://hono.dev/) and Bun
- Uses the request-only scrapers from [search-engine-scraper](https://github.com/zewhal/search-engine-scraper)
- Currently supports Ecosia (more engines will be added using the same library)
- Easily integrates with n8n via HTTP Request nodes
- Export results to CSV, Google Sheets, or other destinations

---

## Installation

Clone the repo and install dependencies using **Bun**:

```bash
git clone https://github.com/zewhal/sik.git
cd sik
bun install
