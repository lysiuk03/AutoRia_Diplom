import React, { ChangeEvent } from "react";

export const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setPhotos: React.Dispatch<React.SetStateAction<File[]>>) => {
  const file = e.target.files;

  if (file) {
    setPhotos((prevFiles) => {
      const updatedFiles = [...prevFiles];
      for (let i = 0; i < file.length; i++) {
        const validImageTypes = ["image/gif", "image/jpeg", "image/webp", "image/png"];
        if (validImageTypes.includes(file[i].type)) {
          const isDuplicate = updatedFiles.some((existingFile) => existingFile.name === file[i].name);
          if (!isDuplicate) {
            updatedFiles.push(file[i]);
          }
        }
      }
      return updatedFiles;
    });
  }
};
