import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

//Here are the necessary tools and information to connect and interact with Supabase, whithout exposing sensitive information in the code.

