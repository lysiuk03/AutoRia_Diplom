import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import Button from "components/ui/Button.tsx";

import React from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  action: () => void;
  actionProcessing?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { isOpen, title, close, action, actionProcessing } = props;

  return (
    <div>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 z-10 backdrop-opacity-20 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center bg-black/50 p-4">
              <TransitionChild
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="p-5 bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg">
                  <h2 className="text-xl">{title}</h2>
                  <div className="flex gap-2 justify-end">
                    <Button disabled={actionProcessing} onClick={() => close()} variant="danger" size="sm">
                      <IconX /> No
                    </Button>
                    <Button disabled={actionProcessing} onClick={() => action()} variant="success" size="sm">
                      {actionProcessing ? <IconLoader2 className="animate-spin" /> : <IconCheck />} Yes
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ConfirmDialog;
