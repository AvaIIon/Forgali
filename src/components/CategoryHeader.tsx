interface CategoryHeaderProps {
  title: string;
  description: string;
}

export const CategoryHeader = ({ title, description }: CategoryHeaderProps) => {
  return (
    <div className="bg-gradient-to-b from-[#E8F4F8] to-[#F0F8FA] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A6C] mb-4" style={{ fontFamily: 'serif' }}>
          {title}
        </h1>
        <p className="text-[#5A7A8A] text-base md:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};
