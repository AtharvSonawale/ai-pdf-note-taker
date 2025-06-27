import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner"; // ✅ Import toast

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, { fileId });
  const saveNote = useMutation(api.notes.AddNotes);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      StarterKit,
      Placeholder.configure({
        placeholder: "Start taking your notes here...",
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  // ✅ Initialize handleSave function
  const handleSave = async () => {
    if (editor) {
      const content = editor.getHTML();
      await saveNote({ fileId, notes: content, createdBy: "user123" });
      toast("Saved"); // ✅ Show toast instead of alert
    }
  };

  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
      {/* ✅ Hidden save button to trigger handleSave */}
      <button onClick={handleSave} className="hidden" id="saveButton"></button>
    </div>
  );
}

export default TextEditor;
