import { z } from 'zod';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-response';
import { prisma } from '@/lib/prisma';

const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().url().optional(),
});

export async function POST(req: Request) {
  try {
    const data = createClientSchema.parse(await req.json());
    
    const client = await prisma.client.create({
      data,
    });

    return createSuccessResponse(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid client data', error.errors);
    }
    return createErrorResponse('INTERNAL_ERROR', 'Failed to create client');
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { name: 'asc' },
    });

    return createSuccessResponse(clients);
  } catch (error) {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to fetch clients');
  }
}
