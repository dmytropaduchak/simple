export type McpToolSeed = {
  name: string
  description: string
}

export type McpSeed = {
  slug: string
  name: string
  description: string
  category: string
  kind: string
  version: string
  tools: McpToolSeed[]
}

export const MCP_SEED: McpSeed[] = [
  {
    slug: "psl",
    name: "psl",
    description:
      "Public Suffix List: split a host into registrable domain, suffix, and subdomain.",
    category: "Internet",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "parse", description: "Split a hostname into subdomain, registrable domain, and public suffix." },
      { name: "registrable", description: "Return the registrable domain (eTLD+1) for a host." },
      { name: "is_suffix", description: "Whether a label is itself a public suffix." },
    ],
  },
  {
    slug: "rdap",
    name: "rdap",
    description: "RDAP domain lookup: registrar, expiry, and nameservers as structured JSON.",
    category: "Internet",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "domain", description: "RDAP record for a domain name." },
      { name: "expiry", description: "Registration expiry timestamp if the registry publishes one." },
      { name: "nameservers", description: "Authoritative nameservers for the domain." },
    ],
  },
  {
    slug: "cert",
    name: "cert",
    description: "Live TLS certificate for a host: expiry, SANs, and issuer.",
    category: "Internet",
    kind: "Inspect",
    version: "v1",
    tools: [
      { name: "inspect", description: "Fetch the presented TLS certificate and parse subject, issuer, SANs." },
      { name: "days_left", description: "Whole days until notAfter." },
      { name: "sans", description: "Subject Alternative Names on the leaf cert." },
    ],
  },
  {
    slug: "dmarc",
    name: "dmarc",
    description: "Mail-auth DNS for a domain: SPF, DMARC, and BIMI records.",
    category: "Internet",
    kind: "Inspect",
    version: "v1",
    tools: [
      { name: "spf", description: "TXT SPF policy, flattened includes when possible." },
      { name: "dmarc", description: "Parsed _dmarc policy (p, rua, pct)." },
      { name: "bimi", description: "BIMI TXT and logo URL if published." },
    ],
  },
  {
    slug: "idna",
    name: "idna",
    description: "Punycode / IDNA: ASCII ↔ Unicode and confusable-lookalike hints.",
    category: "Internet",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "to_ascii", description: "Encode a Unicode domain to A-labels (xn--)." },
      { name: "to_unicode", description: "Decode A-labels back to Unicode." },
      { name: "looks_confusable", description: "Flag homoglyph / mixed-script lookalikes." },
    ],
  },
  {
    slug: "redirect",
    name: "redirect",
    description: "Follow HTTP redirects and return the hop chain plus final URL.",
    category: "Internet",
    kind: "Inspect",
    version: "v1",
    tools: [
      { name: "trace", description: "Each hop: status, location, and timing." },
      { name: "final_url", description: "URL after the last redirect." },
    ],
  },
  {
    slug: "well-known",
    name: "well-known",
    description: "Fetch /.well-known resources: security.txt, oauth, passkeys.",
    category: "Internet",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "get", description: "GET a named well-known path on a host." },
      { name: "probe", description: "Probe the common well-known files and report which exist." },
    ],
  },
  {
    slug: "robots",
    name: "robots",
    description: "robots.txt plus llms.txt: what crawlers and agents are allowed to fetch.",
    category: "Internet",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "robots", description: "Parsed robots.txt groups and sitemaps." },
      { name: "llms_txt", description: "llms.txt / llms-full.txt if published." },
      { name: "is_allowed", description: "Whether a user-agent may fetch a path." },
    ],
  },
  {
    slug: "baseline",
    name: "baseline",
    description: "Web Platform Baseline: is this CSS/JS API newly or widely available?",
    category: "Web platform",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "feature", description: "Baseline status for a feature id (e.g. container-queries)." },
      { name: "group", description: "All features in a BCD group." },
      { name: "in_baseline", description: "Boolean: widely available as of a date." },
    ],
  },
  {
    slug: "mime",
    name: "mime",
    description: "IANA media types: extension ↔ type and charset defaults.",
    category: "Web platform",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "from_ext", description: "Media type for a file extension." },
      { name: "from_type", description: "Common extensions for a media type." },
      { name: "charset", description: "Default charset when the type implies one." },
    ],
  },
  {
    slug: "depsdev",
    name: "depsdev",
    description: "Package metadata and advisories across npm, PyPI, Go, and crates via deps.dev.",
    category: "Packages",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "package", description: "Name, latest version, license, and repo for a package." },
      { name: "versions", description: "Published versions, newest first." },
      { name: "advisories", description: "Known vulnerabilities for a package version." },
    ],
  },
  {
    slug: "scorecard",
    name: "scorecard",
    description: "OpenSSF Scorecard checks for a public GitHub repository.",
    category: "Packages",
    kind: "Inspect",
    version: "v1",
    tools: [
      { name: "get", description: "Overall score and date for owner/repo." },
      { name: "checks", description: "Per-check scores (maintained, branch-protection, …)." },
    ],
  },
  {
    slug: "spdx",
    name: "spdx",
    description: "SPDX license ids and whether two licenses can be combined.",
    category: "Packages",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "lookup", description: "SPDX id, name, OSI/FSF flags, and reference URL." },
      { name: "compatible", description: "Heuristic compatibility of two SPDX ids." },
    ],
  },
  {
    slug: "doi",
    name: "doi",
    description: "Resolve a DOI to Crossref metadata and Unpaywall OA status.",
    category: "Packages",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "resolve", description: "Canonical URL for a DOI." },
      { name: "metadata", description: "Title, authors, venue, year." },
      { name: "is_oa", description: "Whether an open-access PDF is known." },
    ],
  },
  {
    slug: "phone",
    name: "phone",
    description: "libphonenumber: parse, format E.164, and validate a number.",
    category: "Identifiers",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "parse", description: "Country, type (mobile/fixed), and national format." },
      { name: "format", description: "Format as E.164, international, or national." },
      { name: "valid", description: "Whether the number is possible and valid for its region." },
    ],
  },
  {
    slug: "iban",
    name: "iban",
    description: "IBAN checksum, country, and BBAN structure.",
    category: "Identifiers",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "valid", description: "Mod-97 checksum and length for the country." },
      { name: "bank", description: "Domestic bank identifier when the country encodes one." },
      { name: "country", description: "ISO country from the IBAN prefix." },
    ],
  },
  {
    slug: "vin",
    name: "vin",
    description: "NHTSA VIN decode: make, year, body, and open recalls.",
    category: "Identifiers",
    kind: "Decode",
    version: "v1",
    tools: [
      { name: "decode", description: "WMI/VDS/VIS fields: make, model, year, plant." },
      { name: "recalls", description: "Open NHTSA recalls for that vehicle." },
    ],
  },
  {
    slug: "unicode",
    name: "unicode",
    description: "Code point info, NFKC normalize, and confusable characters.",
    category: "Identifiers",
    kind: "Inspect",
    version: "v1",
    tools: [
      { name: "inspect", description: "Code point, hex, and scripts for characters in a string." },
      { name: "normalize", description: "NFC / NFKC form of a string." },
      { name: "confusables", description: "Scripts in the string and whether they are mixed." },
    ],
  },
  {
    slug: "tokens",
    name: "tokens",
    description:
      "Count and split tokens for cl100k_base (GPT-4) and o200k_base (GPT-4o).",
    category: "Agent",
    kind: "Count",
    version: "v1",
    tools: [
      { name: "count", description: "Token count for a string and encoding." },
      { name: "fit", description: "Whether text fits a context budget." },
      { name: "split", description: "Split text into chunks under a token cap." },
    ],
  },
  {
    slug: "holidays",
    name: "holidays",
    description: "Public holidays by country and date.",
    category: "Agent",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "is_holiday", description: "Whether a date is a public holiday in a country." },
      { name: "upcoming", description: "Next N holidays after a date." },
    ],
  },
  {
    slug: "locale",
    name: "locale",
    description: "CLDR plural rules and BCP-47 language tags.",
    category: "Agent",
    kind: "Parse",
    version: "v1",
    tools: [
      { name: "plural", description: "Plural category (one/few/many/other) for a locale and count." },
      { name: "format", description: "Format a number or date in a locale." },
      { name: "parse_tag", description: "Parse a BCP-47 tag into language, script, region." },
    ],
  },
  {
    slug: "quakes",
    name: "quakes",
    description: "USGS earthquakes: recent events and query around a point.",
    category: "World",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "recent", description: "Events above a magnitude in a time window." },
      { name: "around", description: "Events near lat/lon within a radius." },
      { name: "detail", description: "One event by USGS id." },
    ],
  },
  {
    slug: "metar",
    name: "metar",
    description: "Aviation METAR/TAF and airport identity — not city weather.",
    category: "World",
    kind: "Lookup",
    version: "v1",
    tools: [
      { name: "metar", description: "Latest METAR for an ICAO code." },
      { name: "taf", description: "TAF forecast if published." },
      { name: "airport", description: "Name, location, and timezone for an ICAO/IATA code." },
    ],
  },
]
