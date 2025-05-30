"use client";

import { Button } from "../ui/button";
import { api } from "~/../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

const InviteReviewerButton = () => {
  const createInvite = useMutation(api.shareRequest.createRequest);

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateInvite = async (email: string) => {
    try {
      setIsLoading(true);
      await createInvite({ email });
    } catch (error) {
      console.error("Failed to create invite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="text-primary/80 bg-primary-foreground hover:bg-primary-foreground/80 mb-2 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors"
      onClick={() => handleCreateInvite("test@example.com")}
    >
      {isLoading ? (
        <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
      ) : (
        "Share"
      )}
    </Button>
  );
};

export default InviteReviewerButton;
