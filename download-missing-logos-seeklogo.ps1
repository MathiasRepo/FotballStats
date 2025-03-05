# Script to download missing team logos from seeklogo.com

# Create output directory if it doesn't exist
$outputDir = ".\public\images\teams"

# Define missing logos to download
$missingTeams = @(
    @{Name = "Bryne"; Url = "https://seeklogo.com/images/B/bryne-fk-logo-3B9C6A8E0C-seeklogo.com.png"; FileName = "bryne.png"},
    @{Name = "Kristiansund"; Url = "https://seeklogo.com/images/K/kristiansund-bk-logo-F2F2A2C5C1-seeklogo.com.png"; FileName = "kristiansund.png"},
    @{Name = "KFUM Oslo"; Url = "https://seeklogo.com/images/K/kfum-kameratene-oslo-logo-6D2C0D6F3B-seeklogo.com.png"; FileName = "kfum-oslo.png"}
)

foreach ($team in $missingTeams) {
    Write-Host "Downloading logo for $($team.Name)..."
    $outputPath = Join-Path $outputDir $team.FileName
    
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        $webClient.Headers.Add("Referer", "https://seeklogo.com/")
        $webClient.DownloadFile($team.Url, $outputPath)
        Write-Host "Downloaded $($team.Name) logo successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download logo for $($team.Name): $_" -ForegroundColor Red
    }
}

Write-Host "All missing logos downloaded!" -ForegroundColor Green
