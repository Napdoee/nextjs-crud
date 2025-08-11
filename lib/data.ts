import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export async function getContacts(query: string = "", currentPage: number = 1) {
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const whereClause = {
    OR: [
      {
        name: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
      {
        phone: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
    ],
  };

  try {
    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        skip: offset,
        take: limit,
        where: whereClause,
      }),
      prisma.contact.count({
        where: whereClause,
      }),
    ]);

    return {
      contacts,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch contacts: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// export const getContacts = async (query: string, currentPage: number) => {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//   try {
//     const contacts = await prisma.contact.findMany({
//       skip: offset,
//       take: ITEMS_PER_PAGE,
//       where: {
//         OR: [
//           {
//             name: {
//               contains: query,
//               mode: "insensitive",
//             },
//           },
//           {
//             phone: {
//               contains: query,
//               mode: "insensitive",
//             },
//           },
//         ],
//       },
//     });
//     return contacts;
//   } catch {
//     throw new Error("Failed to fetch contact data");
//   }
// };

export const getContactsById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch contact data by ID");
  }
};

export const getContactPages = async (query: string) => {
  try {
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch {
    throw new Error("Failed to feetch contact data");
  }
};
