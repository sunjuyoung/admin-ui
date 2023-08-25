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
import { updateStoreById } from "../../api/apiStore";
import { toast } from "react-hot-toast";
const formSchema = z.object({
  name: z.string().min(4).max(40),
});

const SettingsForm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: (storeData) => {
      console.log(storeData);
      return updateStoreById(storeData.id, {
        name: storeData.name,
        userId: storeData.userId,
      });
    },
    onError: (error) => {
      console.log(error.response.data);
      toast.error(error.response.data);
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      queryClient.invalidateQueries("store");
      toast.success("상점이 생성되었습니다.");
      //window.location.assign(`/store/${data.data}`);
    },
  });

  const onSubmit = async (inputData) => {
    console.log(inputData);
    const result = {
      name: inputData.name,
      id: data.id,
      userId: data.userId,
    };

    mutation.mutate(result);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <Heading title="Settings" description="Manage store" />

        <Button variant="destructive" size="sm" onClick={() => {}}>
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
              <Button className="ml-auto mt-2" onClick={handleSubmit(onSubmit)}>
                수정
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
