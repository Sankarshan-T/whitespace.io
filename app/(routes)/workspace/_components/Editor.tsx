'use client';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
}

function Editor({ initialContent, onChange }: EditorProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [resolvedColors, setResolvedColors] = useState({
        bg: "#ffffff",
        fg: "#000000"
    });

    useEffect(() => {
        setMounted(true);

        const styles = getComputedStyle(document.documentElement);
        const bg = styles.getPropertyValue('--background').trim();
        const fg = styles.getPropertyValue('--foreground').trim();

        const formatColor = (color: string) => {
            if (color.includes('%') || color.split(' ').length > 1) {
                return `hsl(${color.replace(/ /g, ', ')})`;
            }
            return color;
        };

        setResolvedColors({
            bg: formatColor(bg) || (theme === 'dark' ? "#0f172a" : "#ffffff"),
            fg: formatColor(fg) || (theme === 'dark' ? "#ffffff" : "#000000")
        });
    }, [theme]);

    const editor = useCreateBlockNote({
        initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined
    });

    const customTheme: Theme = {
        ...(theme === "dark" ? darkDefaultTheme : lightDefaultTheme),
        borderRadius: 12,
        colors: {
            ...(theme === "dark" ? darkDefaultTheme.colors : lightDefaultTheme.colors),
            editor: {
                text: resolvedColors.fg,
                background: resolvedColors.bg,
            },
            sideMenu: resolvedColors.fg,
        },
    };

    if (!mounted) return null;

    return (
        <div className="ml-2 mt-2">
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
                theme={customTheme}
            />
        </div>
    );
}

export default Editor;