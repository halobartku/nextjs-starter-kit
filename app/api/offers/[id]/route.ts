import { z } from 'zod';
import { createErrorResponse, createNotFoundResponse, createSuccessResponse } from '@/lib/api-response';
import { prisma } from '@/lib/prisma';

const updateOfferSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  clientId: z.string().min(1).optional(),
  value: z.number().min(0).optional(),
  currency: z.string().min(1).optional(),
  validUntil: z.string().datetime().optional(),
  status: z.enum(['draft', 'sent', 'accepted', 'rejected', 'closed', 'paid']).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
    });

    if (!offer) {
      return createNotFoundResponse('Offer not found');
    }

    return createSuccessResponse(offer);
  } catch (error) {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to fetch offer');
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = updateOfferSchema.parse(await req.json());

    const offer = await prisma.offer.update({
      where: { id: params.id },
      data,
    });

    return createSuccessResponse(offer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid offer data', error.errors);
    }
    return createErrorResponse('INTERNAL_ERROR', 'Failed to update offer');
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = updateOfferSchema.partial().parse(await req.json());

    const offer = await prisma.offer.update({
      where: { id: params.id },
      data: {
        ...data,
        ...(data.status && { lastContact: new Date() }),
      },
    });

    return createSuccessResponse(offer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid offer data', error.errors);
    }
    return createErrorResponse('INTERNAL_ERROR', 'Failed to update offer');
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.offer.delete({
      where: { id: params.id },
    });

    return createSuccessResponse({ success: true });
  } catch (error) {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to delete offer');
  }
}
