/**
 * Inspired by GitHub project access rights,
 * underling values similar to file permissions in Unix OS.
 */
export enum Permission {
  // Can delete, add new collaborators, assign access rights, etc.
  Admin = 0b001,
  // Can make changes.
  Write = 0b010,
  // Can see.
  Read = 0b100,
}
