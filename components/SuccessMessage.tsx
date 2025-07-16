"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Succès",
      description: message,
    });
    // Only show once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
