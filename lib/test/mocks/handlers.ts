import { rest } from 'msw'
import config from '@/config'

export const handlers = [
  // Auth endpoints
  rest.post(`${config.api.url}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          },
          token: 'mock-token',
        },
      })
    )
  }),

  // User endpoints
  rest.get(`${config.api.url}/users/:userId`, (req, res, ctx) => {
    const { userId } = req.params
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          id: userId,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date().toISOString(),
        },
      })
    )
  }),

  // Project endpoints
  rest.get(`${config.api.url}/projects`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: '1',
            title: 'Test Project',
            description: 'A test project',
            status: 'active',
            createdAt: new Date().toISOString(),
          },
        ],
      })
    )
  }),

  rest.post(`${config.api.url}/projects`, async (req, res, ctx) => {
    const data = await req.json()
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          id: '2',
          ...data,
          createdAt: new Date().toISOString(),
        },
      })
    )
  }),
]
