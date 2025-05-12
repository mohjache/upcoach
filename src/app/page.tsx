import { ReviewsList, type UserReview } from "~/components/ReviewsList";

export default function HomePage() {
  const mockData: UserReview[] = [
    {
      id: "123456",
      reviewedBy: {
        userId: "1",
        name: "Anaru",
      },
      reviewDate: "2025-05-10T17:00:00",
      notes: "",
      status: "uploaded",
      previewImage:
        "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
    },

    {
      id: "456",
      reviewedBy: {
        userId: "1",
        name: "Anaru",
      },
      reviewDate: "2025-05-11T17:00:00",
      notes: "",
      status: "assigned",
      previewImage:
        "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
    },
    {
      id: "789",
      reviewedBy: {
        userId: "1",
        name: "Anaru",
      },
      notes:
        "Need better timing and active footwork after clear so you are ready for the next shot",
      status: "reviewed",
      reviewDate: "2025-05-12T17:00:00",
      previewImage:
        "https://3gyi2yzoja.ufs.sh/f/6MkX0sloZNbBe0j1rjWqSa8VGxmtUODwrgP2NqIvE74kFLpn",
    },
  ];
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Welcome to upCoach!
      </h1>
      <div className="mx-auto max-w-2xl">
        <ReviewsList reviews={mockData} />
      </div>
    </main>
  );
}
