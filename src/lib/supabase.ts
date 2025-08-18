import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };

export async function incrementPlayCount(trackId: string) {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('track_plays')
      .upsert(
        { track_id: trackId, plays: 1 },
        { onConflict: 'track_id' }
      );
    
    if (error) console.error('Error incrementing play count:', error);
  } catch (error) {
    console.error('Supabase error:', error);
  }
}

export async function incrementCompleteCount(trackId: string) {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('track_plays')
      .upsert(
        { track_id: trackId, completes: 1 },
        { onConflict: 'track_id' }
      );
    
    if (error) console.error('Error incrementing complete count:', error);
  } catch (error) {
    console.error('Supabase error:', error);
  }
}

export async function getTrackStats(trackId: string) {
  if (!supabase) return { plays: 0, completes: 0 };
  
  try {
    const { data, error } = await supabase
      .from('track_plays')
      .select('plays, completes')
      .eq('track_id', trackId)
      .single();
    
    if (error || !data) return { plays: 0, completes: 0 };
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return { plays: 0, completes: 0 };
  }
}