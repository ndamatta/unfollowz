import { Link } from '../i18n/navigations';
import { SelectLanguage } from './SelectLanguage';

export const Header = () => {
  return (
    <header className='container mx-auto mb-7 flex justify-between'>
      <div className='flex items-center gap-5'>
        <Link
          href='/'
          className='text-xl font-medium hover:underline hover:font-bold'
        >
          Home
        </Link>
        <Link
          href='/test'
          className='text-xl font-medium hover:underline hover:font-bold'
        >
          Test
        </Link>
      </div>

      <SelectLanguage />
    </header>
  );
};