import { useFormik } from "formik";
import CustomFormField, {
	FormFieldType,
} from "@/components/forms/CustomFormField";
import { useCreatePost, useEditPost } from "@/actions/blog";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import * as yup from "yup";
import { usePosts } from "@/context/PostContext";
import { wait } from "@/lib";
import { useState } from "react";

type PostFormProps = {
	type?: "create" | "edit";
	post?: PostType;
	closeModal: () => void;
};

const PostForm = ({ type = "create", post, closeModal }: PostFormProps) => {
	const { mutateAsync: createPost } = useCreatePost();
	const { mutateAsync: editPost } = useEditPost();
	const { handleUpdatePost } = usePosts();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (_values: any) => {
		const data = {
			id: 1,
			userId: 1,
			title: values.title,
			body: values.content,
		};

		setIsLoading(true);
		try {
			await wait(1000);
			if (type === "edit" && post) {
				handleUpdatePost(data, "update");
				await editPost({ post_id: post?.id });
			} else {
				handleUpdatePost(data, "add");
				await createPost(data);
			}

			closeModal();
		} catch (error: any) {
		} finally {
			setIsLoading(false);
		}
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				title: post?.title || "",
				content: post?.body || "",
			},
			validationSchema: yup.object().shape({
				title: yup
					.string()
					.min(2, "Title must be at least 2 characters")
					.required("Field is required"),
				content: yup
					.string()
					.min(2, "Content must be at least 2 characters")
					.required("Content is required"),
			}),
			onSubmit,
		});

	return (
		<FormWrapper
			containerStyles="max-w-full"
			onSubmit={handleSubmit}
			footerSection={
				<div className="flex mt-8 flex-col-reverse min-[500px]:row-flex gap-x-4 gap-y-2 !justify-end">
					<CustomButton
						title="Cancel"
						type="button"
						variant="outline"
						className="w-full"
						onClick={closeModal}
					/>

					<CustomButton
						title={`${type === "edit" ? "Edit" : "Create"} Post`}
						type="submit"
						className="w-full"
						isLoading={isLoading}
					/>
				</div>
			}
		>
			<div className="relative flex-column gap-6">
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					name="title"
					label="Title"
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
					onChange={handleChange}
					field={{
						value: values.title,
					}}
				/>

				<CustomFormField
					fieldType={FormFieldType.TEXTAREA}
					name="content"
					label="Content"
					onBlur={handleBlur}
					errors={errors}
					touched={touched}
					onChange={handleChange}
					field={{
						value: values.content,
					}}
				/>
			</div>
		</FormWrapper>
	);
};

export default PostForm;
