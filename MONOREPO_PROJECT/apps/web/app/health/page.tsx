"use client";

import { trpc } from "@/trpc/trpc";

export default function HealthPage() {
  const healthQuery = trpc.health.useQuery();

  console.log(healthQuery);

  return <h1>This is the health route</h1>;
}