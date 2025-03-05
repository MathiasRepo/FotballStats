# Script to download missing team logos

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
        Invoke-WebRequest -Uri $team.Url -OutFile $outputPath
        Write-Host "Downloaded $($team.Name) logo successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download logo for $($team.Name): $_" -ForegroundColor Red
        
        # Create a placeholder with the first letter of the team name
        Write-Host "Creating placeholder for $($team.Name)..." -ForegroundColor Yellow
        
        # Copy the placeholder image
        Copy-Item -Path "$outputDir\team-placeholder.png" -Destination $outputPath
        Write-Host "Created placeholder for $($team.Name)" -ForegroundColor Yellow
    }
}

Write-Host "All missing logos downloaded!" -ForegroundColor Green
