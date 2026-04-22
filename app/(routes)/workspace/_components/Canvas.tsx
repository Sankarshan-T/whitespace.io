"use client";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { WelcomeScreen } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "next-themes";

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    { ssr: false }
);

interface CanvasProps {
    fileId: Id<'files'>;
    fileData: any;
}

export default function Canvas({ fileId, fileData }: CanvasProps) {
    const { theme } = useTheme();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    const onCanvasChange = (elements: any, appState: any, files: any) => {
        if (elements.length > 0) {
            updateWhiteboard({
                _id: fileId,
                whiteboard: JSON.stringify({
                    elements,
                    appState: {
                        zoom: appState.zoom,
                        scrollX: appState.scrollX,
                        scrollY: appState.scrollY,
                        theme: appState.theme
                    },
                    files
                }),
            });
        }
    };

    const getInitialData = () => {
        try {
            return fileData?.whiteboard ? JSON.parse(fileData.whiteboard) : null;
        } catch (e) {
            return null;
        }
    };

    const initialData = getInitialData();

    return (
        <div className="h-full w-full">
            <Excalidraw
                theme={theme === "light" ? "light" : "dark"}
                initialData={{
                    elements: initialData?.elements || [],
                    appState: initialData?.appState || { zenModeEnabled: false },
                    files: initialData?.files || {}
                }}
                onChange={(elements, appState, files) => {
                    onCanvasChange(elements, appState, files);
                }}
            >
                <WelcomeScreen>
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Heading>
                            Diagrams made simple
                        </WelcomeScreen.Center.Heading>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div>
    );
}