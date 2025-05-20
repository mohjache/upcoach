import { ReviewsList } from "~/components/ReviewsList";

const Page = () => {
  return (
    <main className="container mx-auto pt-24 pb-8">
      <div className="mx-auto max-w-2xl">
        <ReviewsList />
      </div>
    </main>
  );
};

export default Page;
