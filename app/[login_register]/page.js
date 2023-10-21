"use client";
import SigninForm from "@/components/signinform/SigninForm";
import SignupForm from "@/components/signupform/SignupForm";
import { useRouter } from "next/navigation";
import { useSelector} from "react-redux";

function Page({ params }) {
  const router = useRouter();
  
  const data3 = useSelector((state) => state.isAdmin.value);



  if (data3) {
   
    if (data3.status == "noToken") {
      if (params.login_register == "login") {
        return <SigninForm isAdmin={data3} form={true} />;
      } else if (params.login_register == "register") {
        return <SignupForm isAdmin={data3} form={false} />;
      }
     
    } else if (data3.data.isAdmin == true) {
    
      router.push(`/dashboard/${data3.data.userName}`);
    } else if (data3.data.userRole == "client") {
      router.push(`/dashboard/${data3.data.userName}`);
    } else if (data3.data.userRole == "instructor") {
      router.push(`/dashboard/${data3.data.userName}`);
    }
  }
}

export default Page;
