param(
  [string]$ZoneName = "dreamlive.site",
  [string]$RecordName = "hugozz.dreamlive.site",
  [string]$Target = "cname.vercel-dns.com"
)

$ErrorActionPreference = "Stop"
$resultPath = Join-Path (Get-Location) "cloudflare-dns-result.json"

if (-not $env:CLOUDFLARE_API_TOKEN) {
  $env:CLOUDFLARE_API_TOKEN = Read-Host "Cloudflare API Token"
}

$headers = @{
  Authorization = "Bearer $env:CLOUDFLARE_API_TOKEN"
  "Content-Type" = "application/json"
}

function Invoke-Cf {
  param(
    [string]$Method,
    [string]$Uri,
    $Body = $null
  )

  if ($null -eq $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers
  }

  return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers -Body ($Body | ConvertTo-Json -Depth 10)
}

$zones = Invoke-Cf -Method Get -Uri "https://api.cloudflare.com/client/v4/zones?name=$ZoneName"
if (-not $zones.success -or $zones.result.Count -lt 1) {
  throw "Could not find Cloudflare zone: $ZoneName"
}

$zoneId = $zones.result[0].id
$encodedName = [System.Uri]::EscapeDataString($RecordName)
$records = Invoke-Cf -Method Get -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records?name=$encodedName"

$changes = @()
foreach ($record in $records.result) {
  if ($record.type -ne "CNAME") {
    $delete = Invoke-Cf -Method Delete -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$($record.id)"
    $changes += "deleted $($record.type) $RecordName"
  }
}

$records = Invoke-Cf -Method Get -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records?type=CNAME&name=$encodedName"
$body = @{
  type = "CNAME"
  name = $RecordName
  content = $Target
  ttl = 1
  proxied = $false
  comment = "Vercel project myspace"
}

if ($records.result.Count -gt 0) {
  $recordId = $records.result[0].id
  $write = Invoke-Cf -Method Patch -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$recordId" -Body $body
  $changes += "updated CNAME $RecordName -> $Target"
} else {
  $write = Invoke-Cf -Method Post -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Body $body
  $changes += "created CNAME $RecordName -> $Target"
}

$result = [ordered]@{
  success = [bool]$write.success
  zone = $ZoneName
  record = $RecordName
  target = $Target
  proxied = $false
  changes = $changes
  recordId = $write.result.id
}

$result | ConvertTo-Json -Depth 10 | Set-Content -Encoding utf8 $resultPath
Write-Host "Cloudflare DNS configured. Result written to $resultPath"
Write-Host "Keep this window open if you want, then return to Codex."
