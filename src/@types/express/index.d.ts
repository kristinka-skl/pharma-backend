import type { UserType } from "../@types/auth.js";

  export {}

  declare global{
    namespace Express{
      interface Request{
        user: UserType;
      }
    }
  }
