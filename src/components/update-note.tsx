import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { LiaPenSolid } from "react-icons/lia";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";
import { toast } from "react-toastify";
import type { Note } from "@/types/note";
import type { MouseEvent } from "react";
import { removeExtraSpaces } from "@/utils/remove-extra-space";
import { Loading } from "./loader";

export function UpdateNote({
  note,
  updateNote,
}: {
  note: Note;
  updateNote: (note: Note) => void;
}) {
  const { authToken } = useAuth();
  const [title, setTitle] = useState<string>(note.title);
  const [tags, setTags] = useState<string>(note.tags.join(" "));
  const [content, setContent] = useState<string>(note.content);
  const [loading, setLoading] = useState<boolean>(false);

  const tagsArray = tags.length >= 1 ? removeExtraSpaces(tags).split(" ") : [];
  const favorite = note.favorite;
  const updated_at = new Date();

  function handleUpdateNote(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();

    if (!title || title.length < 3 || !content || content.length < 15) {
      toast("Input fields cannot be empty or way too short");
      return;
    }

    setLoading(true);

    try {
      axios.patch(
        `https://uptick-week-4.onrender.com/api/note`,
        {
          note_id: note._id,
          title: removeExtraSpaces(title),
          content: removeExtraSpaces(content),
          favorite,
          tags: tagsArray,
          user_id: note.user_id,
          updated_at,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      updateNote({
        _id: note._id,
        title: removeExtraSpaces(title),
        content: removeExtraSpaces(content),
        favorite,
        tags: tagsArray,
        user_id: note.user_id,
        created_at: note.created_at,
        updated_at,
      });
      toast.success("note updated successfully");
      setLoading(false);
    } catch (error: unknown) {
      if (error) {
        toast.error(
          "An error occurred while updating your note in the database. please check your network and try again"
        );
        setLoading(false);
      }
      return;
    }
    setTitle(removeExtraSpaces(title));
    setContent(removeExtraSpaces(content));
    setTags(removeExtraSpaces(tags));
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <span
            role="button"
            className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border"
          >
            <span className="sr-only">Edit Button</span>
            <LiaPenSolid className="text-xl text-black/70 dark:text-white/90" />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">Update note</DialogTitle>
            <DialogDescription>
              Update your memories, journey and experiences
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minLength={3}
                maxLength={150}
                placeholder="how my day went"
                className="invalid:focus-visible:ring-red-500 invalid:focus-visible:border-red-500"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                minLength={3}
                maxLength={150}
                placeholder="#games #fun #assignment"
                className="invalid:focus-visible:ring-red-500 invalid:focus-visible:border-red-500"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minLength={15}
                maxLength={10000}
                placeholder="express yourself, write your thoughts"
                required={true}
                className="invalid:focus-visible:ring-red-500 invalid:focus-visible:border-red-500 max-h-60"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              onClick={(e) => handleUpdateNote(e)}
              className="dark:bg-white/10 hover:cursor-pointer"
            >
              {loading ? (
                <Loading message="" className="text-black dark:text-white" />
              ) : (
                <span className="dark:text-white"> Update Note</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
