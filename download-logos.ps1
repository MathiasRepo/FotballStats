# Script to download team logos

# Create output directory if it doesn't exist
$outputDir = ".\public\images\teams"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Define direct logo URLs from Wikipedia
$teams = @(
    @{Name = "Bodø/Glimt"; Url = "https://upload.wikimedia.org/wikipedia/en/2/2c/Bodo_Glimt_logo.svg"; FileName = "bodo-glimt.svg"},
    @{Name = "Brann"; Url = "https://upload.wikimedia.org/wikipedia/en/8/89/SK_Brann_logo.svg"; FileName = "brann.svg"},
    @{Name = "Bryne"; Url = "https://upload.wikimedia.org/wikipedia/en/0/0f/Bryne_FK_logo.svg"; FileName = "bryne.svg"},
    @{Name = "Fredrikstad"; Url = "https://upload.wikimedia.org/wikipedia/en/d/d0/Fredrikstad_FK_logo.svg"; FileName = "fredrikstad.svg"},
    @{Name = "Hamarkameratene"; Url = "https://upload.wikimedia.org/wikipedia/en/c/c6/Ham-Kam_logo.svg"; FileName = "hamkam.svg"},
    @{Name = "Haugesund"; Url = "https://upload.wikimedia.org/wikipedia/en/9/9b/FK_Haugesund_logo.svg"; FileName = "haugesund.svg"},
    @{Name = "Molde"; Url = "https://upload.wikimedia.org/wikipedia/en/a/a8/Molde_FK_logo.svg"; FileName = "molde.svg"},
    @{Name = "Rosenborg"; Url = "https://upload.wikimedia.org/wikipedia/en/e/e1/Rosenborg_BK_logo.svg"; FileName = "rosenborg.svg"},
    @{Name = "Viking"; Url = "https://upload.wikimedia.org/wikipedia/en/a/a0/Viking_FK_logo.svg"; FileName = "viking.svg"},
    @{Name = "Vålerenga"; Url = "https://upload.wikimedia.org/wikipedia/en/8/87/V%C3%A5lerenga_Fotball_logo.svg"; FileName = "valerenga.svg"},
    @{Name = "Kristiansund"; Url = "https://upload.wikimedia.org/wikipedia/en/b/b5/Kristiansund_BK_logo.svg"; FileName = "kristiansund.svg"},
    @{Name = "Sandefjord"; Url = "https://upload.wikimedia.org/wikipedia/en/c/c4/Sandefjord_Fotball_logo.svg"; FileName = "sandefjord.svg"},
    @{Name = "Sarpsborg 08"; Url = "https://upload.wikimedia.org/wikipedia/en/3/35/Sarpsborg_08_FF_logo.svg"; FileName = "sarpsborg.svg"},
    @{Name = "KFUM Oslo"; Url = "https://upload.wikimedia.org/wikipedia/en/c/c1/KFUM_Oslo_logo.svg"; FileName = "kfum-oslo.svg"},
    @{Name = "Strømsgodset"; Url = "https://upload.wikimedia.org/wikipedia/en/5/5a/Str%C3%B8msgodset_IF_logo.svg"; FileName = "stromsgodset.svg"},
    @{Name = "Tromsø"; Url = "https://upload.wikimedia.org/wikipedia/en/9/9c/Troms%C3%B8_IL_logo.svg"; FileName = "tromso.svg"}
)

foreach ($team in $teams) {
    Write-Host "Downloading logo for $($team.Name)..."
    $outputPath = Join-Path $outputDir $team.FileName
    
    try {
        Invoke-WebRequest -Uri $team.Url -OutFile $outputPath
        Write-Host "Downloaded $($team.Name) logo successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download logo for $($team.Name): $_" -ForegroundColor Red
    }
}

Write-Host "All logos downloaded!" -ForegroundColor Green
