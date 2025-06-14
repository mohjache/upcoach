/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import { useState } from "react";
import useDebounce from "~/lib/useDebouce";
import { useMutation, useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "~/components/Fallback";
import { Button } from "~/components/ui/button";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const foundUsers = useQuery(api.users.searchUsers, {
    query: debouncedSearch ?? "",
  });

  const invite = useMutation(api.shareRequest.createRequest);

  const onInvite = async () => {
    await invite({
      email: email,
    });

    router.push("/dashboard");
  };

  return (
    <main className="container mx-auto pt-24 pb-8">
      <h1 className="text-primary mb-8 text-center text-3xl font-bold">
        Find a Reviewer
      </h1>

      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <Card className="mx-auto mb-8 max-w-2xl">
        <CardHeader>
          <CardTitle> Search by name or email for an existing user.</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="John Doe"
            className="mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          {debouncedSearch && foundUsers === undefined && (
            <FallbackComponent></FallbackComponent>
          )}

          {debouncedSearch && foundUsers && foundUsers.length === 0 && (
            <>
              <p className="text-muted-foreground text-xl">
                No users found - Invite them by entering their email
              </p>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="mb-4 w-full"
              />
              <Button disabled={!email} onClick={(e) => onInvite()}>
                Invite
              </Button>
            </>
          )}

          {debouncedSearch && foundUsers && foundUsers.length > 0 && (
            <ul>
              {foundUsers.map((user) => (
                <li key={user._id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
