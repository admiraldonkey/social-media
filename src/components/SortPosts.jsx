import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

// Radix UI primitive component that toggles filter option for posts. Users can switch between viewing all posts, or those made by people they follow. Query string is added to path as relevant so DisplayPosts can use this to display the correct data.
export function SortPosts() {
  const toggleGroupItemClasses =
    "flex w-min py-3 px-3 items-center justify-center bg-myDarkGrey leading-4 text-myLightGrey first:rounded-l last:rounded-r hover:bg-myLightBlue hover:text-myBlack focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-myDarkBlue data-[state=on]:text-myBlack";

  return (
    <div>
      <h2 className="pl-7 pb-1">Filter Posts</h2>
      <ToggleGroup.Root
        type="single"
        defaultValue="all"
        aria-label="Sort posts"
        className="inline-flex space-x-px w-min rounded bg-myDarkGrey shadow-[0_2px_10px] shadow-blackA4 "
      >
        <Link href={`/posts/?sort=all`}>
          <ToggleGroup.Item
            value="all"
            aria-label="View all posts"
            className={toggleGroupItemClasses}
          >
            All
          </ToggleGroup.Item>
        </Link>
        <Link href={`/posts/?sort=followed`}>
          <ToggleGroup.Item
            value="followed"
            aria-label="View posts of people you follow"
            className={toggleGroupItemClasses}
          >
            Followed
          </ToggleGroup.Item>
        </Link>
      </ToggleGroup.Root>
    </div>
  );
}
