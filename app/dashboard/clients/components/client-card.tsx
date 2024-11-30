import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { MoreVertical, Phone, Mail } from 'lucide-react';
import type { Client } from '@/types';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={client.avatar} alt={client.name} />
          <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{client.name}</CardTitle>
          <CardDescription>{client.company}</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{client.email}</span>
          </div>
          {client.phone && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{client.phone}</span>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Client since {formatDate(client.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
