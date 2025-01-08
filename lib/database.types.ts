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
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          balance: number
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          balance?: number
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          balance?: number
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'income' | 'expense'
          description: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'income' | 'expense'
          description: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'income' | 'expense'
          description?: string
          category?: string
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category: string
          amount: number
          spent: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          amount: number
          spent?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          amount?: number
          spent?: number
          created_at?: string
        }
      }
    }
  }
}