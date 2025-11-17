"use client";

export const SamplePosts = ({
  data,
}: {
  data: {
    id: number;
    name: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) => {
  return (
    <div>
      {data.map((x) => (
        <div key={x.id}>{x.name}</div>
      ))}
    </div>
  );
};

export default SamplePosts;
