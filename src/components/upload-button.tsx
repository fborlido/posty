import { toast } from "sonner";
import { useUploadThing } from "#/lib/uploadthing";
import { Button } from "./ui/button";

type UploadButtonProps = {
	onUpload: (imageUrl: string) => void;
};

export default function UploadButton({ onUpload }: UploadButtonProps) {
	const { isUploading, startUpload } = useUploadThing("imageUploader");

	const handleChange = async (files: FileList | null) => {
		if (files) {
			const file = files.item(0);
			if (file) {
				const uploaded = await startUpload([file]);
				if (!uploaded) {
					toast.error("Failed to upload");
					return;
				}
				const url = uploaded[0].ufsUrl;
				onUpload(url);
			}
		}
	};

	return (
		<Button asChild disabled={isUploading}>
			<label htmlFor="file">
				{isUploading ? "Uploading..." : "Upload here"}
				<input
					id="file"
					type="file"
					className="hidden"
					onChange={(e) => handleChange(e.target.files)}
				/>
			</label>
		</Button>
	);
}
