// FileInput.tsx
import { Button, Container, FormLabel } from "@material-ui/core";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
}

const FileInput: React.FC<FileInputProps> = ({ control }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <>
      {imageFile?.name && <FormLabel className='margin-10'>Current Image: {imageFile?.name}</FormLabel>}
      <Container className="file-input">

        <Controller
          name="image"
          control={control}
          defaultValue=""
          rules={{
            required: 'Image is required',
            validate: {
              size: (files: FileList | undefined) => {
                if (!files || files.length === 0) return 'Please select an image';
                const file = files[0];
                return file.size <= 5 * 1024 * 1024 || 'Image size should be less than 5MB';
              },
              type: (files: FileList | undefined) => {
                if (!files || files.length === 0) return 'Please select an image';
                const file = files[0];
                return (
                  file.type === 'image/png' ||
                  file.type === 'image/jpeg' ||
                  file.type === 'image/jpg' ||
                  'Invalid file type'
                );
              },
            },
          }}
          render={({ field }) => (
            <label htmlFor="upload-image" >
              <Button variant="contained" className="file-upload-button" component="span">
                Upload Snap
              </Button>
              <input
                id="upload-image"
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => { field.onChange(e.target.files); handleFileUpload(e) }}
                ref={field.ref}
              />
            </label>
          )}
        />
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" className="file-upload-image" />}
      </Container>
    </>
  )
};

export default FileInput;
