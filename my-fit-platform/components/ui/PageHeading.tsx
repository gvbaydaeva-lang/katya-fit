type PageHeadingProps = {
  title: string;
  description?: string;
};

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ds-heading">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-ds-muted">{description}</p>
      )}
    </header>
  );
}
