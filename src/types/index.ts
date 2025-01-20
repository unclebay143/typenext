import { Database } from "./supabase";

export type Profession =
  | "programmer"
  | "technicalWriter"
  | "designer"
  | "dataScientist"
  | "productManager"
  | "marketingSpecialist"
  | "contentCreator"
  | "uxResearcher"
  | "devOpsEngineer"
  | "cybersecurityAnalyst"
  | "others";

export type Level = "beginner" | "intermediate" | "advanced";
export type Duration = "long" | "short";

export interface GameText {
  profession: Profession;
  level: Level;
  duration: Duration;
  text: string[];
}

export interface GameResult {
  profession: Profession;
  level: Level;
  wpm: number;
  accuracy: number;
  character: number;
}

export interface LeaderboardEntry extends GameResult {
  displayname: string;
  wpm: number;
  accuracy: number;
}

export interface GameSettings {
  profession: Profession;
  level: Level;
  duration: Duration;
  timerEnabled: boolean;
  timerDuration: number;
}

export type User = Database["public"]["Tables"]["users"]["Row"];
