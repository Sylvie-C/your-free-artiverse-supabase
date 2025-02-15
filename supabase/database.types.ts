export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {               // the data expected from .select()
          id: string
          email: string
          password: string
          pseudo?: string | null
        }

        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          pseudo?: string | null
          email: string
          password: string
        }

        Update: {               // the data to be passed to .update()
          id?: never
          email: string
          password: string
          pseudo?: string      // `not null` columns are optional on .update()
        }

        Delete: {                // the data to be passed to .delete()
          id: string
        }
      }, 

      deleted_users: {
        Insert: {            // the data to be passed to .insert()
          id: string 
          email: string
          password: string
          pseudo?: string | null
        }
      }
    }
  }
}