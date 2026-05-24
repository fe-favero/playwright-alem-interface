// @ts-check
import { test, expect } from '@playwright/test'

test('deve verificar se a api está online', async ({ request }) => {
  const response = await request.get('http://localhost:3333/health')
  await expect(response.status()).toBe(200)

  const body = await response.json()
  await expect(body.service).toBe('shortbeyond-api')
  await expect(body.status).toBe('healthy')
});

