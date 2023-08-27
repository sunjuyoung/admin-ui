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
const formSchema = z.object({
  name: z.string().min(4).max(40),
});

const SettingsForm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store" />

        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <Separator />
      <form className="w-full space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="grid gap-2">
            <div className="mt-4 ">
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
              <Button className="mt-2 ml-auto" onClick={handleSubmit(onSubmit)}>
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
