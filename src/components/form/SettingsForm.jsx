import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStoreById, updateStoreById } from "../../api/apiStore";
import { toast } from "react-hot-toast";
import AlertModal from "../modals/alert-modal";
import ApiAlert from "../ui/api-alert";
import { useOrigin } from "../../hooks/use-origin";
const formSchema = z.object({
  name: z.string().min(4).max(40),
});

const SettingsForm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const origin = useOrigin();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  //수정 mutation
  const mutation = useMutation({
    mutationFn: (storeData) => {
      //console.log(storeData);
      return updateStoreById(storeData.id, {
        name: storeData.name,
        userId: storeData.userId,
      });
    },
    onError: (error) => {
      //console.log(error.response.data);
      toast.error(error.response.data);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("store");
      toast.success(`상점이름이 ${variables.name}으로 변경되었습니다.`);
      //window.location.assign(`/store/${data.data}`);
    },
  });

  //삭제 mutation
  const delMutation = useMutation({
    mutationFn: (data) => {
      //console.log(storeData);
      return deleteStoreById(data.id, data.userId);
    },
    onError: (error) => {
      //console.log(error.response.data);
      toast.error(error.response.data);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("store");
      toast.success(`${variables.name}상점이 삭제되었습니다.`);
      window.location.assign(`/`);
    },
  });

  //수정 버튼
  const onSubmit = async (inputData) => {
    setLoading(true);
    const result = {
      name: inputData.name,
      id: data.id,
      userId: data.userId,
    };
    mutation.mutate(result);
    setLoading(false);
  };

  //삭제 버튼 클릭
  const onDelete = async () => {
    setLoading(true);
    delMutation.mutate(data);
    setLoading(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between px-4">
        <Heading title="Settings" description="Manage store" />

        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <Separator />
      <form className="space-y-8 w-full px-4">
        <div className="grid grid-cols-3">
          <div className="grid gap-2">
            <div className="mt-4">
              <Label htmlFor="name">스토어 이름</Label>
            </div>
            <div>
              <Input
                id="name"
                placeholder="name"
                {...register("name", { required: true })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
            <div>
              <Button
                disabled={loading}
                className="ml-auto mt-2"
                onClick={handleSubmit(onSubmit)}
              >
                수정
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/store/${data.id}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
