'use client'

import { useCreatePost, useUpdatePost } from "@/hooks/postQueries";
import { PostProps } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

export interface postFormCompProps {
  header?: string;
  postDetails?: PostProps;
}

const PostForm = ({ header, postDetails }: postFormCompProps) => {
  const createPostQuery = useCreatePost();
  const updatePostQuery = useUpdatePost();

  // Define the Zod schema for validation
  const postFormSchema = z.object({
    id: z.string().nonempty("Post Id is required"),
    title: z.string().nonempty("Title is required"),
    desc: z.string().nonempty("Description is required"),
    authorId: z.string().nonempty("Author Id is required"),
  });

  type postFormProps = z.infer<typeof postFormSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<postFormProps>({
    resolver: zodResolver(postFormSchema),
  });

  // Update form values when postDetails changes
  useEffect(() => {
    if (postDetails) {
      reset({
        id: postDetails.id,
        title: postDetails.title,
        desc: postDetails.desc,
        authorId: postDetails.authorId,
      });
    }
  }, [postDetails, reset]);

  // Form submission handler
  const onSubmit: SubmitHandler<postFormProps> = async (data) => {
    if (postDetails) {
      await updatePostQuery.mutateAsync(data);
    } else {
      await createPostQuery.mutateAsync({ ...data, authorId: "49063eff-8728-4c82-8eb3-a6dd8599de86" });
    }
  };

  return (
    <div className="container w-25 bg-primary-subtle p-4">
      <h3 className="mb-4 text-center">{header}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
        <input {...register("title")} className={`form-control ${errors.title ? "is-invalid" : ""}`} placeholder="Title" />
        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}

        <textarea {...register("desc")} className={`form-control ${errors.desc ? "is-invalid" : ""}`} rows={4} placeholder="Description" />
        {errors.desc && <div className="invalid-feedback">{errors.desc.message}</div>}

        <input type="hidden" {...register("authorId")} value={postDetails?.authorId || "49063eff-8728-4c82-8eb3-a6dd8599de86"} />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
