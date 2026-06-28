import { useAuth as useSupabaseAuth } from '../context/AuthContext';

/**
 * Custom hook to abstract supabase session management.
 */
export const useAppAuth = () => {
  const { user: supabaseUser, signOut: supabaseSignOut, loading } = useSupabaseAuth();

  const signOut = async () => {
    await supabaseSignOut();
  };

  const avatarUrl = supabaseUser?.user_metadata?.avatar_url || supabaseUser?.user_metadata?.picture;
  const name = supabaseUser?.user_metadata?.full_name || supabaseUser?.user_metadata?.name || '';

  return {
    user: supabaseUser ? { id: supabaseUser.id, email: supabaseUser.email, avatarUrl, name } : null,
    loading,
    error: null,
    signOut,
  };
};

