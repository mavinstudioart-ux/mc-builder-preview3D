import './globals.css';

export const metadata = {
  title: 'MC Builder 3D - Studio Preview & Web Editor Builder Minecraft',
  description: 'Aplikasi web 3D interaktif ringan untuk merancang dan meminjau desain bangunan Minecraft dengan tekstur asli (kayu, batu, papan, dll).',
  keywords: ['Minecraft', '3D Builder', 'Minecraft Preview', 'Minecraft Architect', 'Voxel Editor'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
