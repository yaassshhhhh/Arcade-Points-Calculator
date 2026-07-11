import { supabase } from './supabaseClient';

/**
 * Retrieves the current leaderboard from Supabase.
 * @returns {Promise<Array>} List of leaderboard entries.
 */
export async function getLeaderboard() {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized. Check environment variables.');
      return [];
    }

    const { data, error } = await supabase
      .from('leaderboard')
      .select('user_name, points, badge_count, profile_url')
      .order('points', { ascending: false })
      .limit(50); // Get top 50 users

    if (error) {
      console.error('Error fetching leaderboard from Supabase:', error);
      return [];
    }

    // Map to expected keys
    return data.map(row => {
      let finalUrl = row.profile_url;
      let avatarUrl = null;
      if (finalUrl && finalUrl.includes('|||')) {
        const parts = finalUrl.split('|||');
        finalUrl = parts[0];
        avatarUrl = parts[1];
      }
      
      return {
        userName: row.user_name,
        points: Number(row.points),
        badgeCount: Number(row.badge_count),
        url: finalUrl,
        avatarUrl: avatarUrl,
      };
    });

  } catch (error) {
    console.error('Unexpected error reading leaderboard:', error);
    return [];
  }
}

/**
 * Adds or updates a user in the Supabase leaderboard.
 * @param {Object} user - The user object containing at least { userName, points, badgeCount }.
 */
export async function updateLeaderboard(user) {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized. Cannot update leaderboard.');
      return;
    }

    // 1. Check if user already exists to compare points and badge count
    const { data: existingUser, error: fetchError } = await supabase
      .from('leaderboard')
      .select('points, badge_count, profile_url')
      .eq('user_name', user.userName)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking existing user in Supabase:', fetchError);
      return;
    }

    // 2. If user exists and neither score nor badge count improved, 
    // AND the database already has the avatar (if one is provided), skip update.
    const dbHasAvatar = existingUser?.profile_url?.includes('|||');
    const needsAvatarUpdate = user.userAvatar && !dbHasAvatar;

    if (
      existingUser && 
      user.points <= Number(existingUser.points) &&
      user.badgeCount <= Number(existingUser.badge_count) &&
      !needsAvatarUpdate
    ) {
      return; // Do nothing if the new score or badge count isn't an improvement and avatar is up to date
    }

    // 3. Upsert the new high score
    const combinedUrl = user.userAvatar ? `${user.url}|||${user.userAvatar}` : user.url;

    const { error: upsertError } = await supabase
      .from('leaderboard')
      .upsert({
        user_name: user.userName,
        points: user.points,
        badge_count: user.badgeCount,
        profile_url: combinedUrl,
        facilitator_code: user.facilitatorCode || null,
        facilitator_name: user.facilitatorName || null,
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_name' });

    if (upsertError) {
      console.error('Error updating leaderboard in Supabase:', upsertError);
    }
  } catch (error) {
    console.error('Unexpected error updating leaderboard:', error);
  }
}
