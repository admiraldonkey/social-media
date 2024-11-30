import { GetFollowers, GetUser } from "./GetData";
import Link from "next/link";

// Component that displays a list of follows the current user has
export default async function DisplayFollowers() {
  const myId = (await GetUser("self")).id;
  const myFollowers = await GetFollowers("followers", myId);

  return (
    <div>
      {myFollowers &&
        myFollowers.map((follower) => {
          return (
            <div key={follower.user_id}>
              <Link href={`/user/${follower.user_id}`}>
                {follower.username}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
