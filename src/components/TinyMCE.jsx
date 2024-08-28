import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Container } from "./index.js";
import { useForm, Controller } from "react-hook-form";

function TinyMCE({
  name,
  control,
  label,
  defaultValue = "'Tell Us Your Story...'",
  inlineEditor=false,
}) {
  // const onChange=()=>{}
  console.log("Default val is ");
  console.log(defaultValue);

  return (
    <>
      
      <div className="w-full my-5">
        {label && <label className="inline-block mb-1 pl-1"></label>}
        <Controller
          name={name || "Content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              inline={inlineEditor}
              apiKey="u1lhbzhz7p30moh40pe7o4ro5o7wllxi7zbnh5cqbmimjyf3"
              initialValue={defaultValue}
              init={{
                initialValue:defaultValue,
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  );
}

export default TinyMCE;
