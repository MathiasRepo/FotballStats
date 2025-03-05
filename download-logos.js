const https = require('https');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'public', 'images', 'teams');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define missing logos to download
const missingTeams = [
  {
    name: 'Bryne',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Bryne_FK_logo.svg/1200px-Bryne_FK_logo.svg.png',
    fileName: 'bryne.png'
  },
  {
    name: 'Kristiansund',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Kristiansund_BK_logo.svg/1200px-Kristiansund_BK_logo.svg.png',
    fileName: 'kristiansund.png'
  },
  {
    name: 'KFUM Oslo',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/KFUM_Oslo_logo.svg/1200px-KFUM_Oslo_logo.svg.png',
    fileName: 'kfum-oslo.png'
  }
];

// Function to download a file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all missing logos
async function downloadAllLogos() {
  for (const team of missingTeams) {
    const filePath = path.join(outputDir, team.fileName);
    console.log(`Downloading logo for ${team.name}...`);
    
    try {
      await downloadFile(team.url, filePath);
      console.log(`Downloaded ${team.name} logo successfully`);
    } catch (error) {
      console.error(`Failed to download logo for ${team.name}: ${error.message}`);
    }
  }
  
  console.log('All missing logos downloaded!');
}

downloadAllLogos();
