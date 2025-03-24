/// <reference types="vite/client" />

type PolymorphicProps<
  OwnProps,
  As extends React.ElementType,
  DefaultElement extends React.ElementType,
> = OwnProps &
  (
    | (Omit<React.ComponentProps<As>, "as"> & { as?: As })
    | (Omit<React.ComponentProps<As>, OwnProps> & { as: As })
    | (Omit<React.ComponentProps<DefaultElement>, "as"> & { as?: never })
  );
