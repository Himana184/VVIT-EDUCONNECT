import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { FormError } from "../common/FormError";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { branches } from "@/data/branches";
import { Button } from "../ui/button";

//function to generate pass out years previous 5 and future 5 years
function generateYears() {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    yearsArray.push(i.toString());
  }
  return yearsArray;
}

const RegisterForm = () => {
  // react hook form setup
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors, reset } = form;
  const { errors } = formState;
  const [branch, setBranch] = useState();
  const [passoutYear, setPassoutYear] = useState();
  const [section, setSection] = useState();

  const years = generateYears();
  useEffect(() => {
    clearErrors();
  }, [])

  const handlePhotoUpload = (event) => {
    var output = document.getElementById('preview_img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  const handleStudentRegisteration = async (data) => {
    data.branch = branch;
    data.section = section;
    data.passoutYear = Number(passoutYear);
    console.log("Student Data:", data);
  }

  return (
    <Card className="w-[90%] h-[95%] overflow-auto lg:flex lg:flex-col lg:justify-center pb-10 md:pb-0">
      <CardHeader className="flex items-center">
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>Already have an account? <Link to={"/auth/login"} className="font-medium text-black">Login here</Link></CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleStudentRegisteration)} className="space-y-6">
          {/* Student image*/}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-4 shrink-0">
              <img id='preview_img' className="object-cover w-16 h-16 rounded-full" src="https://vconnectglobe.s3.ap-south-1.amazonaws.com/mentorimage.jpg" alt="Student Image" />
              <label className="block ">
                <span className="sr-only">Choose profile photo</span>
                <input type="file" {...register("studentImage", {
                  required: {
                    value: true,
                    message: "Student image is required"
                  }
                })} onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " />
              </label>
            </div>
            <div className="w-full">{errors["studentImage"] && <FormError message={errors["studentImage"].message} />}</div>
          </div>

          {/* All remaining fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">

            {/* Student name */}
            <div className="flex flex-col space-y-2">
              <Label>Student Name</Label>
              <Input
                type="text"
                placeholder="John Doe" {...register("name", {
                  required: {
                    value: true,
                    message: "Student Name is required"
                  }
                })} />
              {errors['name'] && <FormError message={errors['name'].message} />}
            </div>

            {/* Roll Number */}
            <div className="flex flex-col space-y-2">
              <Label>Roll number</Label>
              <Input type="text" placeholder="20BQ1A****"
                {
                ...register("rollNo", {
                  required: {
                    value: true,
                    message: "Student roll number is required"
                  }
                })
                }
              />
              {errors['rollNo'] && <FormError message={errors['rollNo'].message} />}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>College Mail</Label>
              <Input type="email" placeholder="20BQ1A****@vvit.net"
                {
                ...register("collegeEmail", {
                  required: {
                    value: true,
                    message: "Student college email is required"
                  }
                })
                }
              />
              {errors['collegeEmail'] && <FormError message={errors['collegeEmail'].message} />}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Personal Mail</Label>
              <Input type="email" placeholder="johndoe@example.com"
                {
                ...register("personalMail", {
                  required: {
                    value: true,
                    message: "Student personal email is required"
                  }
                })
                }
              />
              {errors['personalMail'] && <FormError message={errors['personalMail'].message} />}
            </div>


            <div className="flex flex-col space-y-2">
              <Label>Contact</Label>
              <Input type="text" placeholder="1234567890"
                {
                ...register("contact", {
                  required: {
                    value: true,
                    message: "Student contact is required"
                  }
                })
                }
              />
              {errors['contact'] && <FormError message={errors['contact'].message} />}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="*******"
                {
                ...register("password", {
                  required: {
                    value: true,
                    message: "Account password is required"
                  }
                })
                }
              />
              {errors['password'] && <FormError message={errors['password'].message} />}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Branch</Label>
              <Select required={true} onValueChange={(e) => setBranch(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose  branch" />
                </SelectTrigger>
                <SelectContent>
                  {
                    branches.map((branch, index) => {
                      return (
                        <SelectItem key={index} value={branch}>{branch}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Section</Label>
              <Select required={true} onValueChange={(e) => setSection(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose section" />
                </SelectTrigger>
                <SelectContent>
                  {
                    ["A", "B", "C", "D"].map((section, index) => {
                      return (
                        <SelectItem key={index} value={section}>{section}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>


            <div className="flex flex-col space-y-2">
              <Label>Passout year</Label>
              <Select required={true} onValueChange={(e) => setPassoutYear(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose passout year" />
                </SelectTrigger>
                <SelectContent>
                  {
                    years.map((year, index) => {
                      return (
                        <SelectItem key={index} value={year}>{year}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center lg:col-span-3">
              <Button type="submit">Register</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm