export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          concentration: number | null
          created_at: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id: string
          is_acknowledged: boolean | null
          message: string
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          threshold: number | null
          title: string
          user_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          concentration?: number | null
          created_at?: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id?: string
          is_acknowledged?: boolean | null
          message: string
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          threshold?: number | null
          title: string
          user_id: string
        }
        Update: {
          acknowledged_at?: string | null
          concentration?: number | null
          created_at?: string | null
          device_id?: string
          gas_type?: Database["public"]["Enums"]["gas_type"]
          id?: string
          is_acknowledged?: boolean | null
          message?: string
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          threshold?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      device_settings: {
        Row: {
          created_at: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id: string
          notifications_enabled: boolean | null
          threshold_critical: number | null
          threshold_high: number | null
          threshold_low: number | null
          threshold_medium: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id?: string
          notifications_enabled?: boolean | null
          threshold_critical?: number | null
          threshold_high?: number | null
          threshold_low?: number | null
          threshold_medium?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          gas_type?: Database["public"]["Enums"]["gas_type"]
          id?: string
          notifications_enabled?: boolean | null
          threshold_critical?: number | null
          threshold_high?: number | null
          threshold_low?: number | null
          threshold_medium?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_settings_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          battery_level: number | null
          created_at: string | null
          device_type: string
          firmware_version: string | null
          id: string
          last_seen: string | null
          location: string
          name: string
          status: Database["public"]["Enums"]["device_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          battery_level?: number | null
          created_at?: string | null
          device_type?: string
          firmware_version?: string | null
          id?: string
          last_seen?: string | null
          location: string
          name: string
          status?: Database["public"]["Enums"]["device_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          battery_level?: number | null
          created_at?: string | null
          device_type?: string
          firmware_version?: string | null
          id?: string
          last_seen?: string | null
          location?: string
          name?: string
          status?: Database["public"]["Enums"]["device_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gas_readings: {
        Row: {
          concentration: number
          created_at: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id: string
          is_safe: boolean | null
          timestamp: string | null
          unit: string
        }
        Insert: {
          concentration: number
          created_at?: string | null
          device_id: string
          gas_type: Database["public"]["Enums"]["gas_type"]
          id?: string
          is_safe?: boolean | null
          timestamp?: string | null
          unit?: string
        }
        Update: {
          concentration?: number
          created_at?: string | null
          device_id?: string
          gas_type?: Database["public"]["Enums"]["gas_type"]
          id?: string
          is_safe?: boolean | null
          timestamp?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "gas_readings_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          alert_severity_threshold:
            | Database["public"]["Enums"]["alert_severity"]
            | null
          created_at: string | null
          email_enabled: boolean | null
          id: string
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          sms_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alert_severity_threshold?:
            | Database["public"]["Enums"]["alert_severity"]
            | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alert_severity_threshold?:
            | Database["public"]["Enums"]["alert_severity"]
            | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
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
      alert_severity: "low" | "medium" | "high" | "critical"
      device_status: "online" | "offline" | "maintenance" | "error"
      gas_type: "co" | "co2" | "methane" | "propane" | "natural_gas" | "smoke"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      device_status: ["online", "offline", "maintenance", "error"],
      gas_type: ["co", "co2", "methane", "propane", "natural_gas", "smoke"],
    },
  },
} as const
