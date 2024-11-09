import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface Props {
  isSubmitting: boolean;
  text: string;
  loadingText: string;
}

const FormUploadButton = ({ isSubmitting, text, loadingText }: Props) => {
  return (
    <div>
      {isSubmitting ? (
        <Button className="flex gap-2 items-center" disabled>
          <LoaderCircle className="animate-spin" />
          <span>{loadingText}</span>
        </Button>
      ) : (
        <Button>{text}</Button>
      )}
    </div>
  );
};

export default FormUploadButton;
