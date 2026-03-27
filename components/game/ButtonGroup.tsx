interface ButtonGroupProps {
  children: React.ReactNode;
  positionClass?: string;
  direction?: 'row' | 'col';
}

export function ButtonGroup({ children, positionClass = 'top-8 right-8', direction = 'col' }: ButtonGroupProps) {
  return <div className={`fixed ${positionClass} z-50 flex ${direction === 'col' ? 'flex-col' : 'flex-row'} gap-2`}>{children}</div>;
}
