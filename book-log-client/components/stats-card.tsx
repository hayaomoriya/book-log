"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
