'use client';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
}

function Editor({
    initialContent,
    onChange,
}: EditorProps) {
    const { theme } = useTheme();
    const editor = useCreateBlockNote({
        initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined
    });

    const corenoteDark = {
        ...darkDefaultTheme,
        colors: {
            ...darkDefaultTheme.colors,
            borderRadius: 12,
            editor: {
                text: "var(--foreground)",
                background: "var(--background)",
            },
            sideMenu: "var(--foreground)",
        },
    };

    const corenoteLight = {
        ...lightDefaultTheme,
        borderRadius: 12,
        colors: {
            ...lightDefaultTheme.colors,
            editor: {
                text: "var(--foreground)",
                background: "var(--background)",
            },
            sideMenu: "var(--foreground)",
        },
    };

    return (
        <div className="ml-2 mt-2">
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
                theme={theme === "dark" ? corenoteDark : corenoteLight}
            />
        </div>
    )
}

export default Editor;