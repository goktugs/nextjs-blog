import { GetServerSidePropsContext } from "next";
import { IComment, ICommentResponse, IPosts, IUser } from "../../types/types";
import Image from "next/image";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const postRes = await fetch(`https://dummyjson.com/posts/${id}`);
  const userRes = await fetch(`https://dummyjson.com/users/${id}`);
  const commRes = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  const postData: IPosts = await postRes.json();
  const userData: IUser = await userRes.json();
  const commData: ICommentResponse = await commRes.json();

  return {
    props: { postData, userData, commData: commData.comments },
  };
}

export default function Page({
  postData,
  userData,
  commData,
}: {
  postData: IPosts;
  userData: IUser;
  commData: IComment[];
}) {
  return (
    <div className="container mx-auto px-12">
      <h1 className="mb-8 text-4xl text-center font-bold py-12 ">
        {postData.title}
      </h1>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 justify-center items-center">
          <Image src={userData.image} alt="user" width={48} height={48} />
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-sm font-bold">{userData.firstName} </div>
              <div className="text-sm font-bold w-full ml-2">
                {userData.lastName}
              </div>
            </div>
            <div className="text-xs">{userData.email}</div>
          </div>
        </div>
      </div>

      <p>{postData.body}</p>
      <div className="flex text-xs text-zinc-500 mt-8 gap-4">
        tags:
        {postData.tags.map((tag) => (
          <div className="mr-2 " key={tag}>
            {tag}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-12 mb-4">Comments</h2>
        {commData.map((comm: IComment) => (
          <div className="flex gap-4 mb-4" key={comm.id}>
            <div className="flex flex-col">
              <div className="flex">
                <div className="text-sm font-bold">{comm.user.username}</div>
              </div>
              <div className="text-xs md:text-xl">{comm.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
