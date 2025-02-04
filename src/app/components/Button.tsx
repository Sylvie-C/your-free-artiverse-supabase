interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export default function Button({ variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={
        variant === "default"
          ? "px-4 py-2 bg-blue-600 text-white rounded"
          : "px-4 py-2 border border-gray-400 text-gray-700 rounded"
      }
      {...props}
    />
  );
}
