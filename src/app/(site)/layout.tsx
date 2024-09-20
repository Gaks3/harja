import { validateRequest } from "@/server/auth";
import Footer from "../_components/home/footer";
import Navbar from "../_components/home/navbar";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const validate = await validateRequest();

  return (
    <>
      <Navbar user={validate.user} />
      {children}
      <Footer />
    </>
  );
}
