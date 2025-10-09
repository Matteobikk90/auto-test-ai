import type { AuthSliceType } from "@/types/store/auth";
import type { ThemeSliceType } from "@/types/store/theme";

export type StoreState = ThemeSliceType & AuthSliceType;
