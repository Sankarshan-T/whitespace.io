'use client';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
}

function Editor({
    initialContent,
    onChange,
}: EditorProps) {
    const editor = useCreateBlockNote({
        initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined
    });

    return (
        <div className="ml-2 mt-2">
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
            />
        </div>
    )
}

export default Editor;