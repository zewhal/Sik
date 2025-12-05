import { Hono } from 'hono'
import { ecosia } from 'search-engine-scraper'
import type { SERPResponse, SERPQueryParams } from 'search-engine-scraper'
import { createCuimpClient } from 'search-engine-scraper'


const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

app.post('/ecosia', async (c) => {
    const body: SERPQueryParams = await c.req.json()
    const result: SERPResponse = await ecosia(createCuimpClient({}), body, {}, "")

    return c.json(result)
})

export default { 
  port: 3000, 
  fetch: app.fetch, 
} 