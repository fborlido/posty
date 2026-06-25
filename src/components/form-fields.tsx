import { useFieldContext } from "#/lib/form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import UploadButton from "./upload-button";

type TextFieldProps = {
	label: string;
} & React.ComponentProps<"input">;

export function TextField({ label, ...props }: TextFieldProps) {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				{...props}
			/>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
}

type ImageUploadFieldProps = {
	label: string;
};

export function ImageUploadField({ label }: ImageUploadFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<div className="">
				<UploadButton onUpload={(url) => field.setValue(url)} />
			</div>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
}
