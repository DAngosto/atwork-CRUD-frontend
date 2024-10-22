export class EmailUtils {
  public static isValidEmail(email: string): boolean {
    const emailRegex =
      /^(?=[A-Z])[A-Z0-9_\-\.]+@(?=(([A-Z0-9_\-]+\.)+))\1[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }
}
