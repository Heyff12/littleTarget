declare namespace Target {
  enum Category {
    study = "study",
    career = "career",
    life = "life",
  }
  interface TargetItem {
    study: string[];
    career: string[];
    life: string[];
  }
  interface TargetOperatePrams {
    quarter: number;
    category: Category;
    data?: string[];
  }
}
