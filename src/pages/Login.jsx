import { Button } from "@/components/ui/button";
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
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

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
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="email" />
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">취소</Button>
          <Button>로그인</Button>
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
