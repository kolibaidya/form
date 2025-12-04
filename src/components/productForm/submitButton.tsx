import { Button } from "@/components/ui/button";
import type { SubmitButtonProps } from "../types/submitButtonProps";

export const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <Button type="submit" disabled={isLoading}>
    {isLoading ? "Saving..." : label}
  </Button>
);
