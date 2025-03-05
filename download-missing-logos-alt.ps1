# Script to download missing team logos from alternative sources

# Create output directory if it doesn't exist
$outputDir = ".\public\images\teams"

# Define missing logos to download
$missingTeams = @(
    @{Name = "Bryne"; Url = "https://www.logofootball.net/wp-content/uploads/Bryne-FK-HD-Logo.png"; FileName = "bryne.png"},
    @{Name = "Kristiansund"; Url = "https://www.logofootball.net/wp-content/uploads/Kristiansund-BK-HD-Logo.png"; FileName = "kristiansund.png"},
    @{Name = "KFUM Oslo"; Url = "https://www.logofootball.net/wp-content/uploads/KFUM-Oslo-HD-Logo.png"; FileName = "kfum-oslo.png"}
)

foreach ($team in $missingTeams) {
    Write-Host "Downloading logo for $($team.Name)..."
    $outputPath = Join-Path $outputDir $team.FileName
    
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        $webClient.DownloadFile($team.Url, $outputPath)
        Write-Host "Downloaded $($team.Name) logo successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download logo for $($team.Name): $_" -ForegroundColor Red
        
        # Try alternative URL
        if ($team.Name -eq "Bryne") {
            $altUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Bryne_FK_logo.svg/1200px-Bryne_FK_logo.svg.png"
        } elseif ($team.Name -eq "Kristiansund") {
            $altUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Kristiansund_BK_logo.svg/1200px-Kristiansund_BK_logo.svg.png"
        } elseif ($team.Name -eq "KFUM Oslo") {
            $altUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/KFUM_Oslo_logo.svg/1200px-KFUM_Oslo_logo.svg.png"
        }
        
        try {
            Write-Host "Trying alternative URL for $($team.Name)..." -ForegroundColor Yellow
            $webClient.DownloadFile($altUrl, $outputPath)
            Write-Host "Downloaded $($team.Name) logo successfully from alternative source" -ForegroundColor Green
        } catch {
            Write-Host "Failed to download logo for $($team.Name) from alternative source: $_" -ForegroundColor Red
        }
    }
}

Write-Host "All missing logos downloaded!" -ForegroundColor Green
