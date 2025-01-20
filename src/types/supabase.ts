export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      leaderboard: {
        Row: {
          created_at: string
          id: string
          top_result: string | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          top_result?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          top_result?: string | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_top_result_fkey"
            columns: ["top_result"]
            isOneToOne: false
            referencedRelation: "results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboard_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          accuracy: number
          character: number
          created_at: string
          id: string
          level: string
          profession: string
          user: string
          wpm: number
        }
        Insert: {
          accuracy: number
          character: number
          created_at?: string
          id?: string
          level: string
          profession: string
          user?: string
          wpm: number
        }
        Update: {
          accuracy?: number
          character?: number
          created_at?: string
          id?: string
          level?: string
          profession?: string
          user?: string
          wpm?: number
        }
        Relationships: [
          {
            foreignKeyName: "results_user_fkey1"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          displayname: string | null
          email: string | null
          id: string
        }
        Insert: {
          displayname?: string | null
          email?: string | null
          id: string
        }
        Update: {
          displayname?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_top_users_by_wpm: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_11: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_12: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_13: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_2: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_3: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_v1: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_v10: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_v4: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_v5: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_per_user_v6: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_top_wpm_with_user: {
        Args: {
          user_id: string
        }
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_3: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_4: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v10: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v11: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v12: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v13: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v14: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v2: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v3: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v4: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v5: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          username: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v6: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v7: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v8: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          total_wpm: number
          total_accuracy: number
        }[]
      }
      get_user_wpm_accuracy_v9: {
        Args: Record<PropertyKey, never>
        Returns: {
          user: string
          displayname: string
          wpm: number
          accuracy: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
