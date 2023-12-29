export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      {children}
    </main>
  );
}
