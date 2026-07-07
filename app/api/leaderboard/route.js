import { NextResponse } from 'next/server';
import { getLeaderboard } from '../../../lib/leaderboardStore';

// We disable caching for this route so it always returns fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    
    // The top 50 logic is now handled in getLeaderboard directly,
    // but we can slice again just in case, though it's redundant.
    const topUsers = leaderboard.slice(0, 50);
    
    return NextResponse.json({ success: true, data: topUsers });
  } catch (error) {
    console.error('Error fetching leaderboard API:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
