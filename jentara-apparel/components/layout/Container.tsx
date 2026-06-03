interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
}