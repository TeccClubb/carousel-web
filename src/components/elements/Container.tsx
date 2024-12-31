const Container: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
    </div>
  );
};

export default Container;
