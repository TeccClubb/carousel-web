const ContainerFluid: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return <div className={`w-full mx-auto px-4 ${className}`}>{children}</div>;
};

export default ContainerFluid;
