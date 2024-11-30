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
]
