import * as yup from "yup";
import { genders } from "@/constants";

export const FormBuilderSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name cannot exceed 50 characters")
		.matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
		.required("Name is required"),

	email: yup.string().email("Invalid email").required("Email is required"),
	gender: yup
		.string()
		.oneOf(
			genders.map((level) => level.value),
			"Please select a valid gender"
		)
		.nullable()
		.required("Gender is required"),
});
