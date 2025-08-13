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
import { LuPlus } from "react-icons/lu";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";
import { toast } from "react-toastify";
import type { Note } from "@/types/note";
import type { MouseEvent } from "react";

export function AddNewNote({
  updateNote,
}: {
  updateNote: (notes: Note[]) => void;
}) {
  const { authToken, user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const tagsArray = tags.length >= 1 ? tags.split(" ") : [];

  function handleAddNewNote(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();

    // input validations

    if (!title || title.length < 3 || !content || content.length < 15) {
      toast("Input fields cannot be empty or way too short");
      return;
    }

    try {
      axios.post(
        `https://uptick-week-4.onrender.com/api/note?user_id=${user?._id}`,
        {
          title,
          content,
          tags: tagsArray,
          user_id: user?._id,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch (error: unknown) {
      if (error) {
        toast.error(
          "An error occurred while saving your note in the database. please check your network and try again"
        );
      }
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>(
          `https://uptick-week-4.onrender.com/api/note?user_id=${user?._id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        updateNote(response.data);
      } catch (error: unknown) {
        if (error) {
          toast.error(
            "An error occurred while updating your note. please check your network and try again"
          );
          return;
        }
      }
    };

    fetchNotes();

    setTitle("");
    setTags("");
    setContent("");
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="hover:cursor-pointer">
            <LuPlus />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">Add new note</DialogTitle>
            <DialogDescription>
              Document your memories, journey and experiences
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
              onClick={(e) => handleAddNewNote(e)}
            >
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
