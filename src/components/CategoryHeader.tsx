interface CategoryHeaderProps {
  title: string;
  description: string;
}

export const CategoryHeader = ({ title, description }: CategoryHeaderProps) => {
  return (
    <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4" style={{ fontFamily: 'serif' }}>
          {title}
        </h1>
        <p className="text-brand/70 text-base md:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};
