import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = {
	onHandleChange?: any;
	value?: any;
	onBlur?: (e: { target: { name: string; value: string } }) => void;
	name: string;
};

const TextEditor = ({
	onHandleChange,
	onBlur,
	value,
	name,
}: TextEditorProps) => {
	const handleEditorChange = (
		content: string
		// delta: any,
		// source: any,
		// editor: ReactQuill.UnprivilegedEditor
	) => {
		onHandleChange(content);
	};

	const handleBlur = () => {
		if (onBlur) {
			onBlur({
				target: {
					name,
					value: value || "",
				},
			});
		}
	};

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={handleEditorChange}
			onBlur={handleBlur}
			placeholder="Write something awesome..."
			style={{ height: "200px", marginBlock: "0.5rem" }}
			modules={TextEditor.modules}
			formats={TextEditor.formats}
		/>
	);
};

TextEditor.modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
	],
};

TextEditor.formats = [
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"video",
];
export default TextEditor;
