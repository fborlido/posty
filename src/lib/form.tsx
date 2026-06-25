import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { ImageUploadField, TextField } from "#/components/form-fields";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		ImageUploadField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});
