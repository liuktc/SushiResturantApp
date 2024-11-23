import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const expoConfig = Constants.expoConfig || Constants.manifest;

const { SUPABASE_URL, SUPABASE_KEY } = expoConfig.extra;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
