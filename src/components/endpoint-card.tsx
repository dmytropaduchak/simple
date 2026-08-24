"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function EndpointCard({
  endpoint,
  slug,
  isLive,
}: {
  endpoint: string
  slug: string
  isLive: boolean
}) {
  const [copied, setCopied] = useState<"url" | "connect">()
  const connectJson = JSON.stringify(
    { mcpServers: { [slug]: { url: endpoint } } },
    null,
    2,
  )

  async function copy(text: string, which: "url" | "connect") {
    await navigator.clipboard.writeText(text)
    setCopied(which)
    window.setTimeout(() => setCopied(undefined), 1500)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/70 p-3 backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Endpoint
          </p>
          <Badge variant={isLive ? "default" : "secondary"}>
            {isLive ? "Live" : "Coming soon"}
          </Badge>
        </div>
        <div className="flex items-start gap-2">
          <code className="min-w-0 flex-1 break-all text-sm">{endpoint}</code>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Copy endpoint URL"
            onClick={() => copy(endpoint, "url")}
          >
            {copied === "url" ? <Check /> : <Copy />}
          </Button>
        </div>
        {!isLive ? (
          <p className="text-xs text-muted-foreground">
            Listed in the catalog; tools are not serving yet.
          </p>
        ) : null}
      </div>

      {isLive ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Cursor connect
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Copy Cursor MCP snippet"
              onClick={() => copy(connectJson, "connect")}
            >
              {copied === "connect" ? <Check /> : <Copy />}
              Copy
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted/60 p-2 text-xs leading-relaxed">
            {connectJson}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
