import * as z from "zod";
import Modal from "../ui/modal";

import useStoreModal from "../../hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../api/apiRequest";
import { toast } from "react-hot-toast";
import { createStore } from "../../api/apiStore";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1).max(20),
});

const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const storeModal = useStoreModal();
  const currentUser = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return createStore(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("상점 생성에 실패했습니다.");
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("store");
      toast.success("상점이 생성되었습니다.");
      storeModal.onClose();
      window.location.assign(`/store/${data.data}`);
    },
  });

  const onSubmit = async (value) => {
    mutation.mutate({
      name: value.name,
      userId: currentUser.userInfo.userId,
    });
  };

  return (
    <Modal
      title="상점 만들기"
      description="상점을 만들어보세요!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>상점 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="E-commerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button variant="outline" onClick={storeModal.onClose}>
                  취소
                </Button>
                <Button type="submit">다음</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
