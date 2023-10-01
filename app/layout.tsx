import NavBar from '@/components/navbar.component';
import './globals.css';
import { exo_2, orbitron } from './fonts';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo_2.variable}`}>
      <body className="bg-orange-100 px-4 py-2 flex flex-col min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow">{children}</main>
        <footer className="border-t py-3 text-center text-xs">
          Game data and images courtesy of{' '}
          <a
            className="text-orange-800 hover:underline"
            href="https://rawg.io/"
            target="_blank"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
