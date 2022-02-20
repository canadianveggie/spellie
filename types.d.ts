export type Hint = {
  /** to display to user */
  message: string;
  /** to highlight on the keyboard */
  letter?: string;
};

export type KeyState = {
  /** most keys are letters but one is backspace, one is to submit a guess */
  type: "letter" | "back" | "enter";
  /** shown on the keyboard */
  label: string;
  /** keys start as "available" and update as user guesses (based on presence in the target word) */
  state: "available" | "match" | "present" | "miss";
};
