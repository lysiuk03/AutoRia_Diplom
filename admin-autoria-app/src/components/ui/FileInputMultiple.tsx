import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconPhoto } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

import React from "react";

type ImageSortableProps = {
  remove: (name: string) => void;
  file: File;
};

type ImageUploadMultiProps = {
  children: React.ReactNode;
  // remove: (name: string) => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageSortableContainer = (props: ImageSortableProps) => {
  const { remove, file } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.name });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition: transition, cursor: "grab" }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            remove(file.name);
          }}
          className="absolute -right-2 -top-2 rounded-full text-red-600 bg-white/80 cursor-pointer"
        >
          <IconTrash />
        </button>
        <img className="h-28 w-28 object-cover rounded" alt={file.name} src={URL.createObjectURL(file)} />
      </div>
    </div>
  );
};

const FileInputMultiple = (props: ImageUploadMultiProps) => {
  const { children, files, setFiles } = props;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const reOrderFilesArray = (e: DragEndEvent) => {
    if (!e.over) {
      return;
    }

    const { active, over } = e;
    const activeIndex = files.findIndex((file) => file.name === active.id);
    const overIndex = files.findIndex((file) => file.name === over.id);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
      return;
    }

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(activeIndex, 1);
    newFiles.splice(overIndex, 0, draggedFile);

    setFiles(newFiles);
  };

  const remove = (file: string) => {
    setFiles(files.filter((x: File) => x.name !== file));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-64 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg hover:ring-blue-500 hover:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:ring-blue-500 dark:hover:border-blue-500 dark:shadow-sm-light ">
        <div className="text-center flex gap-5 items-center">
          <IconPhoto className="h-28 w-28" />
          <div className=" gap-2 flex flex-col text-sm leading-6 items-center text-gray-600">
            <label className="relative cursor-pointer font-semibold text-indigo-600 outline-none">
              <span>Upload a file</span>
              {children}
            </label>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <DndContext sensors={sensors} onDragEnd={reOrderFilesArray}>
            <SortableContext items={files.map((i) => i.name)} strategy={horizontalListSortingStrategy}>
              {files.map((file: File) => (
                <ImageSortableContainer remove={remove} key={file.name} file={file} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default FileInputMultiple;
