import MDEditor, { type MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface Props extends MDEditorProps {}

export function MarkdownEditor({ value, ...props }: Props) {
	return (
		<div className="focus-within:border-black overflow-hidden border border-input rounded-lg">
			<MDEditor
				height={350}
				data-color-mode="light"
				previewOptions={{
					rehypePlugins: [[rehypeSanitize]],
				}}
				value={value}
				{...props}
			/>
		</div>
	);
}
