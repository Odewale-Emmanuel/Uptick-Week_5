import { MdClose } from "react-icons/md";
import { Tag } from "@/components/note-tag";
import type { Note } from "@/types/note";
import { Button } from "./ui/button";
import { dateWithTime } from "@/utils/date-handler";
import { cn } from "@/lib/utils";

export function PreviewNote({
  note,
  closePreview,
}: {
  note: Note | null;
  closePreview: () => void;
}) {
  if (!note) {
    closePreview();
    return;
  }

  return (
    <div className="hidden lg:flex flex-col gap-4 md:gap-6 col-span-2 border-s-2 dark:bg-white/10 p-4 sm:p-6 h-full overflow-hidden">
      {note && (
        <>
          <header className="border-b-1 pb-4 flex text-balance items-center justify-between gap-2">
            <h2 className="font-normal text-lg sm:text-xl capitalize">{`My Notes  >  ${note.title}`}</h2>
            <Button variant="ghost" onClick={closePreview}>
              <span className="sr-only">Close Note Preview</span>
              <MdClose className=" hover:cursor-pointer" />
            </Button>
          </header>

          <h2 className="text-3xl font-bold capitalize">{note.title}</h2>

          <div>
            <table className="border-separate border-spacing-x-6 border-spacing-y-2">
              <tr>
                <td className="text-gray-500 dark:text-gray-400 text-sm">
                  Created By
                </td>
                <td className="ms-2 text-sm">You</td>
              </tr>
              <tr>
                <td className="text-gray-500 dark:text-gray-400 text-sm">
                  Last Modified
                </td>
                <td className="text-sm">
                  {dateWithTime(new Date(note.updated_at))}
                </td>
              </tr>
              {note.tags.length >= 1 && (
                <tr>
                  <td className="text-gray-500 dark:text-gray-400 text-sm">
                    Tags
                  </td>
                  <td className="text-sm inline-flex items-center">
                    <div className="inline-flex flex-wrap my-1 gap-2 sm:gap-2">
                      {note.tags.map((tag, index) => (
                        <Tag name={tag} key={index} className="text-sm" />
                      ))}
                      {/* non-mvp feature  */}
                      <Tag name={`+ add new tag`} className="text-sm hidden" />
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>

          <div className="h-52 grow-1 flex flex-col gap-2">
            <h3 className="font-bold text-2xl">Full Gist</h3>
            <p
              className={cn(
                "text-md py-3 px-4 rounded-md text-gray-700 bg-black/2 dark:bg-black/10 dark:text-white/90 grow-1 overflow-hidden overflow-y-auto w-full [&::-webkit-scrollbar]:w-1",
                "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              )}
            >
              {note.content}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
