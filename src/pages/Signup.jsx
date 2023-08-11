import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import apiRequest from "../api/apiRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(4).max(40),
    password: z.string().min(4).max(40),
    passwordConfirm: z.string().min(4).max(40),
  });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const onSubmit = async (data) => {
    if (password !== passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    const response = await apiRequest.post("auth/register", {
      email: data.email,
      username: data.username,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response.status === 200) {
      toast.success("회원가입이 완료되었습니다.");
      navigate("/login");
    } else {
      toast.error("회원가입에 실패했습니다.");
      setError("email", {
        type: "manual",
        message: "이미 사용중인 이메일입니다.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>회원가입을 해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <p>{message}</p>}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">닉네임</Label>
                <Input
                  id="username"
                  placeholder="닉네임"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">패스워드</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirm">패스워드 확인</Label>
                <Input
                  id="passwordConfirm"
                  placeholder="Password"
                  {...register("passwordConfirm", { required: true })}
                />

                <ErrorMessage
                  errors={errors}
                  name="passwordConfirm"
                  render={({ message }) => <p>{message}</p>}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">취소</Button>
          <Button onClick={handleSubmit(onSubmit)}>완료</Button>
        </CardFooter>
        <div>
          <Accordion type="single" collapsible className=" text-sm mx-3">
            <AccordionItem value="item-1">
              <AccordionTrigger> 이미 회원이신가요? </AccordionTrigger>
              <AccordionContent>
                <a href="/login" className="text-xs font-semibold underline">
                  로그인 화면으로 이동
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
