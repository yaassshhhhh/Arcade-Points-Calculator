import { NextResponse } from 'next/server';
import { getLeaderboard } from '../../../lib/leaderboardStore';

// We disable caching for this route so it always returns fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    
    // The top 15 logic is requested by the user
    const topUsers = leaderboard.slice(0, 15);
    
    return NextResponse.json({ success: true, data: topUsers });
  } catch (error) {
    console.error('Error fetching leaderboard API:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
