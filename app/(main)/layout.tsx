import NavigationBottom from "@worldcord/components/navigation/navigation-bottom";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative w-full">
      <div className="absolute bottom-6 z-10 dark:bg-zinc-900 h-16 bg-zinc-200 left-1/2 -translate-x-1/2 px-6 rounded-2xl flex items-center">
        <NavigationBottom />
      </div>
      <main className="h-full">{children}</main>
    </div>
  );
}
