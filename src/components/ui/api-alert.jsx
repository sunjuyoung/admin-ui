import { Copy, Server } from "lucide-react";
import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const ApiAlert = ({ title, description, variant }) => {
  const textMap = {
    public: "Public",
    admin: "Admin",
  };

  const variantMap = {
    public: "secondary",
    admin: "desstructive",
  };

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" size={24} />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap.public}>{textMap.admin}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-2 font-mono font-semibold text-sm">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
