import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DialogProps } from "@/types/dialog.ts";
import { UN_FOCUS_DIALOG_Z_INDEX } from "@/constants";
import { DialogLinkedList } from "@/class/DialogLinkedList.ts";


export const useDialogStore = defineStore("dialog", () => {
  // dialog list by click order
  const dialogMaintainer = ref<DialogLinkedList>(new DialogLinkedList());

  const dialogs = computed(() => {
    return dialogMaintainer.value.toList();
  });

  const openDialog = (dialog: DialogProps) => {
    const isExist = dialogMaintainer.value.isExist(dialog.id);

    if (!isExist) {
      dialogMaintainer.value.add({
        ...dialog,
        next: null
      });
    }
    focusDialog(dialog);
  };

  const closeDialog = (dialog: DialogProps) => {
    focusDialog(dialog);
    const isExist = dialogMaintainer.value.isExist(dialog.id);
    if (!isExist) {
      alert(`弹窗${dialog.id}关闭失败`);
      return;
    }
    dialogMaintainer.value.remove(dialog.id);
    focusDialog();
  };

  const clickDialog = (dialog: DialogProps) => {
    focusDialog(dialog);
  };
  /**
   * 导致聚焦的因素: 打开弹窗、点击弹窗、关闭其他弹窗（自动聚焦一个弹窗）
   * @param dialog
   */
  const focusDialog = (dialog?: DialogProps) => {
    const { pointer, target } = dialogMaintainer.value.peek(dialog?.id);
    // focus dialog by target
    if (target) {
      dialogMaintainer.value.adjustSpecTarget(pointer, target);
    }
    dialogMaintainer.value.focusAuto();
  };
  const showDialog = (dialog: DialogProps) => {
  };


  const updateDialog = (dialog: DialogProps) => {
  };
  const hideDialog = (dialog: DialogProps) => {
  };


  return {
    dialogs,
    updateDialog,
    closeDialog,
    openDialog,
    addDialog: openDialog,
    hideDialog,
    showDialog,
    clickDialog
  };

});