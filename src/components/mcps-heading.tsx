export function McpsHeading({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
        Simple MCPs
      </h1>
      <p className="max-w-md text-sm text-muted-foreground md:text-base">
        Remote MCP servers with 2–5 tools an agent can call. Browse {count}{" "}
        listed below, then point a client at{" "}
        <span className="whitespace-nowrap">/mcp/&lt;name&gt;/v1</span>.
      </p>
    </div>
  )
}
