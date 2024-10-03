// FormFooter.tsx
import { Button } from 'rizzui';
import cn from '../utils/class-names';
import { useRef } from 'react';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  handleAltBtn?: () => void;
  onClick?: () => Promise<void>; // Add onClick prop to handle submission
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  className,
  handleAltBtn,
  onClick, // Destructure onClick from props
}: FormFooterProps) {
  
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        className,
        negMargin
      )}
    >
      <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={handleAltBtn} // Handle alternative button action
      >
        {altBtnText}
      </Button>
      <Button 
        type="button" // Use type="button" to prevent default form submission
        isLoading={isLoading} 
        className="w-full @xl:w-auto"
        onClick={onClick} // Call the onClick prop when clicked
      >
        {submitBtnText}
      </Button>
    </div>
  );
}
