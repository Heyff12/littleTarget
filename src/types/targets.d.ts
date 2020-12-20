declare namespace Target {
  // enum Category {
  //   study = "study",
  //   career = "career",
  //   life = "life",
  // }
  type Category = "study" | "career" | "life";
  interface TargetItem {
    study: string[];
    career: string[];
    life: string[];
  }
  interface TargetOperatePrams {
    quarter: number;
    category: string;
    data?: string;
  }
}
