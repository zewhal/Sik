# Sik

A personal API-first platform for SERP scraping and workflow automation using alternative search engines. Includes pre-built n8n workflows for various automation tasks.

---

## Features

- API-first, lightweight, and fast (built with [Hono](https://hono.dev/) and Bun)
- Supports DuckDuckGo and Ecosia (more engines will be added)
- Easily integrates with n8n via HTTP Request nodes
- Export results to CSV, Google Sheets, or other destinations

---

## Installation

Clone the repo and install dependencies using **Bun**:

```bash
git clone https://github.com/zewhal/sik.git
cd sik
bun install
