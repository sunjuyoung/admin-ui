import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../api/apiRequest";
import { setLogin } from "../slices/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(40),
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

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await apiRequest.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      dispatch(
        setLogin({
          token: response.data.token,
          userId: response.data.id,
          email: response.data.email,
          role: response.data.role,
        })
      );
      toast.success("로그인 성공");
    } catch (error) {
      toast.error("로그인 실패, 회원 정보를 확인해 주세요");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>로그인을 해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">취소</Button>
          <Button onClick={handleSubmit(onSubmit)}>로그인</Button>
        </CardFooter>
        <div>
          <Accordion type="single" collapsible className=" text-sm mx-3">
            <AccordionItem value="item-1">
              <AccordionTrigger> 회원이 아직 아니신가요? </AccordionTrigger>
              <AccordionContent>
                <a href="/signup" className="text-xs font-semibold underline">
                  회원가입을 하시면 다양한 혜택을 누리실 수 있습니다.
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
};

export default Login;
