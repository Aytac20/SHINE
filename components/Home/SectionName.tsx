import { SectionNameProps } from "@/types";

const SectionName: React.FC<SectionNameProps> = ({ section }) => {
  return (
    <div className='mx-4 mb-4 flex items-center'>
      <hr className='flex-grow border-t border-gray-400' />
      <h1 className='px-4 text-sm tracking-wider whitespace-nowrap text-gray-700 uppercase lg:text-lg'>
        {section}
      </h1>
      <hr className='flex-grow border-t border-gray-400' />
    </div>
  );
};

export default SectionName;
