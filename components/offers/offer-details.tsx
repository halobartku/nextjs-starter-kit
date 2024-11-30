import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Status } from '@/components/pipeline/components/status';
import type { Client, Offer, Product } from '@/types';

interface OfferDetailsProps {
  offer: Offer;
  client?: Client;
  products?: Product[];
}

export function OfferDetails({ offer, client, products }: OfferDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{offer.title}</h2>
          {client && (
            <p className="text-muted-foreground">{client.name}</p>
          )}
        </div>
        <Status status={offer.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Value
              </div>
              <div className="text-lg font-medium">
                {formatCurrency(offer.value, offer.currency)}
              </div>
            </div>

            {offer.validUntil && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Valid Until
                </div>
                <div>{formatDate(offer.validUntil)}</div>
              </div>
            )}

            {offer.sentAt && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Sent Date
                </div>
                <div>{formatDate(offer.sentAt)}</div>
              </div>
            )}

            {offer.lastContact && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Last Contact
                </div>
                <div>{formatDate(offer.lastContact)}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {client && (
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div>{client.email}</div>
              </div>

              {client.phone && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Phone
                  </div>
                  <div>{client.phone}</div>
                </div>
              )}

              {client.company && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Company
                  </div>
                  <div>{client.company}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {offer.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{offer.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
