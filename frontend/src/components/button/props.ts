export default interface ButtonProps {
  props: {
    type?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    content?: string;
  };
}
