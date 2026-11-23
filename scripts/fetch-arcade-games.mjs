import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

const GAMES = [
  {
    name: 'adventure',
    id: '7561',
    filename: 'adventure_nov.png',
    title: 'Arcade Adventure: Cloud Infrastructure & App Scale'
  },
  {
    name: 'voyage',
    id: '7562',
    filename: 'voyage_nov.png',
    title: 'Arcade Voyage: Python Apps & Data Analytics'
  },
  {
    name: 'trail',
    id: '7563',
    filename: 'trail_nov.png',
    title: 'Arcade Trail: Cloud Security & GKE Cost Control'
  },
  {
    name: 'basecamp',
    id: '7564',
    filename: 'basecamp_nov.png',
    title: 'Arcade Base Camp November 2026'
  },
  {
    name: 'diwali',
    id: '7565',
    filename: 'diwali_nov.png',
    title: 'Diwali in the Arcade'
  },
  {
    name: 'simulator',
    id: '7566',
    filename: 'simulator_nov.png',
    title: 'Arcade Simulator: Cloud Infrastructure Engineer'
  }
];

export async function fetchGameBadges() {
  console.log('🚀 Starting Arcade Game Badges Auto-Fetch for November 2026...');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const results = [];

  for (const game of GAMES) {
    const pageUrl = `https://www.skills.google/games/${game.id}`;
    console.log(`\n🔍 Fetching badge for "${game.title}" (ID: ${game.id})...`);

    try {
      // Use curl to bypass cloudflare / user-agent restrictions
      const html = execSync(`curl -sL "${pageUrl}"`, { encoding: 'utf-8', timeout: 15000 });

      // Match badge image inside game__badge container
      const badgeMatch = html.match(/<div class=['"]game__badge['"]>[\s\S]*?<img[^>]+src=['"]([^'"]+)['"]/i);
      
      let imgUrl = badgeMatch ? badgeMatch[1] : null;

      if (!imgUrl) {
        // Fallback: search any cdn.qwiklabs image in the markup
        const fallbackMatch = html.match(/src=['"](https:\/\/cdn\.qwiklabs\.com\/[^'"]+)['"]/);
        if (fallbackMatch) {
          imgUrl = fallbackMatch[1];
        }
      }

      if (!imgUrl) {
        console.error(`❌ Could not locate badge image for game ${game.id}`);
        results.push({ ...game, success: false, error: 'Image URL not found' });
        continue;
      }

      console.log(`   Found badge CDN URL: ${imgUrl}`);
      const destPath = path.join(imagesDir, game.filename);

      // Download the image using curl
      execSync(`curl -sL "${imgUrl}" -o "${destPath}"`, { timeout: 15000 });

      const stats = fs.statSync(destPath);
      console.log(`✅ Saved ${game.filename} (${stats.size} bytes)`);

      results.push({
        ...game,
        success: true,
        cdnUrl: imgUrl,
        size: stats.size,
        localPath: `/images/${game.filename}`
      });
    } catch (err) {
      console.error(`❌ Error fetching game ${game.id}:`, err.message);
      results.push({ ...game, success: false, error: err.message });
    }
  }

  console.log('\n📊 Fetch Summary:');
  console.table(
    results.map(r => ({
      Game: r.name,
      ID: r.id,
      Success: r.success ? '✅' : '❌',
      File: r.filename,
      Size: r.size ? `${r.size} bytes` : '-'
    }))
  );

  return results;
}

// Run directly if called as a script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchGameBadges();
}
