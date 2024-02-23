/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardFooter, } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormError } from "../common/FormError";
import { useDispatch } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const LoginForm = () => {
  const [role, setRole] = useState("student")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit, register, formState, reset, clearErrors } = form;
  const { errors } = formState;


  const handleUserLogin = async (data) => {
    const response = await dispatch(userLogin(data));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/admin", { replace: true })
    }
  }


  return (
    <Card className="w-[90%] md:w-[400px] shadow-md">
      <CardHeader className="flex space-y-5">
        <div className="w-full flex justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/VVIT_Logo.png" className="w-40 h-30" />
        </div>
        <CardTitle className="text-center">Sign In to your account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleUserLogin)} className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="johndoe@vvit.net" {...register("email", {
              required: {
                value: true,
                message: "Email is required"
              }
            })} />

            {errors["email"] && <FormError message={errors["email"].message} />}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="******" {...register("password", {
              required: {
                value: true,
                message: "Password is required"
              }
            })} />
            {errors["password"] && <FormError message={errors["password"].message} />}

          </div>
          <div className="space-y-2 ">
            <RadioGroup defaultValue="student" className="flex justify-between" onValueChange={(e) => setRole(e)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coordinator" id="r2" />
                <Label htmlFor="r2">Coordinator</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="r2" />
                <Label htmlFor="r2">Admin</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full ">Login</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>Don&apos;t have an account?
          <Link to={"/auth/register"} className="font-medium"> Register here</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;