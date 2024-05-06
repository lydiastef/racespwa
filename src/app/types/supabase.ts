export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      races: {
        Row: {
          created_at: string
          id: number
          "text where": string | null
          "title where": string | null
        }
        Insert: {
          created_at?: string
          id?: number
          "text where"?: string | null
          "title where"?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          "text where"?: string | null
          "title where"?: string | null
        }
        Relationships: []
      }
      where: {
        Row: {
          created_at: string
          id: number
          text: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          text?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          text?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
