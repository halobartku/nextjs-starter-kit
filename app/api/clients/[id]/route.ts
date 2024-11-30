import { z } from 'zod';
import { createErrorResponse, createNotFoundResponse, createSuccessResponse } from '@/lib/api-response';
import { prisma } from '@/lib/prisma';

const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().url().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        offers: true,
      },
    });

    if (!client) {
      return createNotFoundResponse('Client not found');
    }

    return createSuccessResponse(client);
  } catch (error) {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to fetch client');
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = updateClientSchema.parse(await req.json());

    const client = await prisma.client.update({
      where: { id: params.id },
      data,
    });

    return createSuccessResponse(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid client data', error.errors);
    }
    return createErrorResponse('INTERNAL_ERROR', 'Failed to update client');
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.client.delete({
      where: { id: params.id },
    });

    return createSuccessResponse({ success: true });
  } catch (error) {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to delete client');
  }
}
