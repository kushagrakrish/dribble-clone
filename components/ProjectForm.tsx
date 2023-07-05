"use client";

import { FormState, ProjectInterface, SessionInterface } from "@/common.type";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const image = null;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();
    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);

        router.push(`/`);
      }
      // Create project
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='flexStart form' onSubmit={handleFormSubmit}>
      <div className='flexStart form_image-container'>
        <label htmlFor='poster' className='flexCenter form_image-label'>
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id='image'
          type='file'
          accept='image/*'
          required={type === "create" ? true : false}
          className='form_image-input'
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className='sm:p-10 object-contain z-20 '
            alt='Project Poster'
            fill
          />
        )}
      </div>
      <FormField
        title='Title'
        state={form.title}
        placeholder='Flexibble'
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title='Description'
        state={form.description}
        placeholder='Showcase and discover remarkable developer projects.'
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type='url'
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://kushagrakrishna.me/'
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type='url'
        title='GitHub URL'
        state={form.githubUrl}
        placeholder='https://github.com/kushagrakrish'
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/* Custom Category */}
      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className='w-full flexStart'>
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type='submit'
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          submitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
