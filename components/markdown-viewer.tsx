"use client";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownViewerProps {
	value: string;
}

export default function ({ value }: MarkdownViewerProps) {
	return (
		<div data-color-mode="light">
			<MDEditor.Markdown rehypePlugins={[[rehypeSanitize]]} source={value} />
		</div>
	);
}
