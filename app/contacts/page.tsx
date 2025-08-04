import ContactTable from "@/components/contact-table";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { CreateButton } from "@/components/button";
import { getContactPages } from "@/lib/data";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getContactPages(query);

  return (
    <div className="mx-auto mt-5 max-w-screen-md">
      <div className="flex justify-between items-center gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <ContactTable query={query} currentPage={currentPage} />
      <div className="flex justify-end mt-5">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacts;
