const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const cheerio = require('cheerio');

const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

if (!urlMatch || !keyMatch) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(urlMatch[1], keyMatch[1]);

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeAvatar(url) {
  try {
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const res = await fetch(formattedUrl);
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    let userAvatar = $('.ql-avatar img').attr('src') || $('.profile-avatar img').attr('src') || $('img.avatar').attr('src') || $('ql-avatar').attr('src') || null;
    
    if (userAvatar && userAvatar.startsWith('/')) {
      try {
        const urlObj = new URL(formattedUrl);
        userAvatar = `${urlObj.origin}${userAvatar}`;
      } catch (e) {
        // Ignore URL parsing errors
      }
    }
    return userAvatar;
  } catch (error) {
    console.error(`Error scraping avatar for ${url}:`, error.message);
    return null;
  }
}

async function run() {
  console.log("Fetching all users from leaderboard...");
  const { data: users, error } = await supabase.from('leaderboard').select('*');
  
  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  console.log(`Found ${users.length} total users.`);

  let updatedCount = 0;

  for (const user of users) {
    if (!user.profile_url || user.profile_url.includes('|||')) {
      // Skip if already has avatar or no URL
      continue;
    }

    console.log(`Processing: ${user.user_name} (${user.profile_url})`);
    
    const avatarUrl = await scrapeAvatar(user.profile_url);
    
    if (avatarUrl) {
      const combinedUrl = `${user.profile_url}|||${avatarUrl}`;
      
      const { error: updateError } = await supabase
        .from('leaderboard')
        .update({ profile_url: combinedUrl })
        .eq('id', user.id);
        
      if (updateError) {
        console.error(`Failed to update ${user.user_name}:`, updateError);
      } else {
        console.log(`✅ Updated ${user.user_name} with avatar!`);
        updatedCount++;
      }
    } else {
      console.log(`⚠️ No avatar found for ${user.user_name}.`);
    }

    // Wait a bit to avoid rate limits
    await delay(500);
  }

  console.log(`\nMigration complete. Updated ${updatedCount} profiles.`);
}

run();
